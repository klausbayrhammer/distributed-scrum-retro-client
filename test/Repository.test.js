import Repository from '../src/Repository';
import chai from 'chai';

chai.should();

describe('the repository', function () {
    it('should have three empty columns as default initial state', function () {
        const repository = new Repository;
        repository.columns.should.eql([{id:1, title:"Good", cards:[]}, {id:2, title:"Bad", cards:[]}, {id:3, title:"Next actions", cards:[]}]);
    });
    it('should be possible to pass the repository an initialState', function () {
        const repository = new Repository([{id:1, title:"Good", cards:[]}]);
        repository.columns.should.eql([{id:1, title:"Good", cards:[]}]);
    });
    it('should add a card when the createCard function is invoked', done => {
        const repository = new Repository;
        repository.onChange(newRepo => {
            const newCard = newRepo.columns[0].cards[0];
            newCard.should.contain({title:'title', votes:0, createdByMe:true});
            newCard.id.should.not.be.undefined;
            done();
        });

        repository.createCard({columnId:1, title:'title'});
    });
    it('should add a vote to a card when the addVote function is invoked', done => {
        const repository = new Repository;
        repository.createCard({columnId:1, title:'title'});
        repository.onChange(newRepo => {
            newRepo.columns[0].cards[0].votes.should.equal(1);
            done();
        });

        repository.addVote(repository.columns[0].cards[0].id);
    });
    it('should remove a vote to a card when the removeVote function is invoked', done => {
        const repository = new Repository;
        repository.createCard({columnId:1, title:'title'});
        repository.onChange(newRepo => {
            newRepo.columns[0].cards[0].votes.should.equal(-1);
            done();
        });

        repository.removeVote(repository.columns[0].cards[0].id);
    });
    it('should delete a card when the deleteCard function is invoked', done => {
        const repository = new Repository;
        repository.createCard({columnId:1, title:'title'});
        repository.onChange(newRepo => {
            newRepo.columns[0].cards.should.be.empty;
            done();
        });

        repository.deleteCard(repository.columns[0].cards[0].id);
    });

    it('should set the createCard flag for a column if the prepareCreateCard function is invoked', done => {
        const repository = new Repository;
        repository.onChange(newRepo => {
            newRepo.columns[0].createCard.should.be.true;
            done();
        });

        repository.prepareCreateCard(repository.columns[0].id);
    });

    it('should remove the createCard flag for a column if the undoPrepareCreateCard function is invoked', done => {
        const repository = new Repository;
        repository.prepareCreateCard(repository.columns[0].id);
        repository.onChange(newRepo => {
            newRepo.columns[0].createCard.should.be.false;
            done();
        });
        repository.undoPrepareCreateCard(repository.columns[0].id);
    });
    it('should remove the createCard flag if a card has been created', done => {
        const repository = new Repository;
        repository.prepareCreateCard(repository.columns[0].id);
        repository.onChange(newRepo => {
            newRepo.columns[0].createCard.should.be.false;
            done();
        });
        repository.createCard({columnId:repository.columns[0].id, title:'title'});
    });
});