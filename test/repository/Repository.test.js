import chai from 'chai';
import uuid from 'uuid-v4';
import Repository from '../../src/repository/Repository';

chai.should();

function initializeRepository(initialState, appId) {
  return new Promise((resolve) => {
    const repository = new Repository({ initialState, appId });
    repository.onChange(resolve);
  });
}

describe('the firebase repository', () => {
  it('should be able to set and fetch the the default initial app state', (done) => {
    const obs = (newRepository) => {
      newRepository.columns.should.eql([
        { id: 'G', title: 'Good', createCard: undefined, cards: [] },
        { id: 'B', title: 'Bad', createCard: undefined, cards: [] },
        { id: 'N', title: 'Next actions', createCard: undefined, cards: [] },
      ]);
      done();
    };

    const repository = new Repository();
    repository.onChange(obs);
  });

  it('should be able to set and fetch the the initial app state', async() => {
    const repository = await initializeRepository({ G: { title: 'Good' } });
    repository.columns.should.eql([
      { id: 'G', title: 'Good', createCard: undefined, cards: [] },
    ]);
  });

  it('should be able to create cards', async() => {
    const repository = await initializeRepository({ G: { title: 'Good' } });
    await new Promise((resolve) => {
      repository.onChange((newRepository) => {
        newRepository.columns[0].cards[0].should.contain({ title: 'title', votes: 0, createdByMe: true });
        resolve();
      });
      repository.createCard({ title: 'title', columnId: 'G' });
    });
  });

  it('should be able to vote for cards', async() => {
    const repository = await initializeRepository(
      { G: { title: 'Good', cards: { card1: { title: 'title', votes: 0 } } } });

    await new Promise((resolve) => {
      repository.onChange((newRepository) => {
        newRepository.columns[0].cards[0].votes.should.equal(1);
        resolve();
      });
      repository.addVote('card1');
    });
  });

  it('should be able to remove votes for cards', async() => {
    const repository = await initializeRepository({
      G: {
        title: 'Good',
        cards: { card1: { title: 'title', votes: 0 } },
      },
    });
    await new Promise((resolve) => {
      repository.onChange((newRepository) => {
        newRepository.columns[0].cards[0].votes.should.equal(-1);
        resolve();
      });
      repository.removeVote('card1');
    });
  });

  it('should be able to delete cards', async() => {
    const repository = await initializeRepository({
      G: {
        title: 'Good',
        cards: { card1: { title: 'title', votes: 0 } },
      },
    });
    await new Promise((resolve) => {
      repository.onChange((newRepository) => {
        newRepository.columns[0].cards.should.be.empty;
        resolve();
      });
      repository.deleteCard('card1');
    });
  });

  it('should set the createCard flag for a column if the prepareCreateCard function is invoked', async() => {
    const repository = await initializeRepository({ G: { title: 'Good' } });
    await new Promise((resolve) => {
      repository.onChange(() => {
        repository.columns[0].createCard.should.be.true;
        resolve();
      });
      repository.prepareCreateCard('G');
    });
  });

  it('should remove the createCard flag for a column if the undoPrepareCreateCard function is invoked', async() => {
    const repository = await initializeRepository({ G: { title: 'Good', createCard: true } });
    await new Promise((resolve) => {
      repository.onChange(() => {
        repository.columns[0].createCard.should.be.false;
        resolve();
      });
      repository.undoPrepareCreateCard('G');
    });
  });
  it('should remove the createCard flag for a column if the undoPrepareCreateCard function is invoked', async() => {
    const repository = await initializeRepository({ G: { title: 'Good', createCard: true } });
    await new Promise((resolve) => {
      repository.onChange(() => {
        try {
          repository.columns[0].createCard.should.be.false;
          resolve();
        } catch (e) {
          // app should be in this state at some point
          // ignore earlier changes
        }
      });
      repository.createCard({ columnId: 'G', title: 'title' });
    });
  });

  it('it should not sync the createCard flag across multiple clients', async() => {
    const appId = uuid();
    const initialState = { G: { title: 'Good', createCard: true } };
    const [firstRepo, secondRepo] = await Promise.all([
      initializeRepository(initialState, appId),
      initializeRepository(initialState, appId),
    ]);
    await new Promise((resolve) => {
      secondRepo.onChange(() => {
        secondRepo.columns[0].createCard.should.be.true;
        resolve();
      });
      firstRepo.createCard({ title: 'title', columnId: 'G' });
    });
  });

  it('should change a cards title if the editCardTitle function is invoked', async() => {
    const repository = await initializeRepository({
      G: {
        title: 'Good',
        cards: { card1: { title: 'title', votes: 0 } },
      },
    });
    await new Promise((resolve) => {
      repository.onChange(() => {
        repository.columns[0].cards[0].title.should.equal('newTitle');
        resolve();
      });
      repository.editCardTitle('card1', 'newTitle');
    });
  });
});
