import chai from 'chai';
import transformRemoteColumns from '../../src/repository/transform-remote-columns';

chai.should();

describe('transform-remote-columns.test', () => {
  it('should transform remote columns correctly', () => {
    const remoteColumns = {
      B: { title: 'Bad', order: 1 },
      G: { title: 'Good', order: 0 },
    };
    transformRemoteColumns({ remoteColumns }).should.eql([
      { id: 'G', title: 'Good', createCard: undefined, cards: [] },
      { id: 'B', title: 'Bad', createCard: undefined, cards: [] },
    ]);
  });

  it('should map cards correctlytransform remote columns correctly', () => {
    const remoteColumns = {
      B: {
        title: 'Bad', order: 1, cards: { card1: { title: 'title', votes: 0 } },
      },
    };
    transformRemoteColumns({ userId: 1, remoteColumns }).should.eql([
      {
        id: 'B',
        title: 'Bad',
        createCard: undefined,
        cards: [{
          id: 'card1', title: 'title', votes: 0, createdByMe: false, editCard: undefined,
        }]
      },
    ]);
  });
  it('should map the create-card flag correctly', () => {
    const remoteColumns = {
      B: {
        title: 'Bad', order: 1,
      },
    };
    transformRemoteColumns({ userId: 1, remoteColumns, createCardForColumn: { 'B': true } }).should.eql([
      {
        id: 'B',
        title: 'Bad',
        createCard: true,
        cards: [],
      },
    ]);
  });
  it('should map the editCard flag correctly', () => {
    const remoteColumns = {
      B: {
        title: 'Bad', order: 1, cards: { card1: { title: 'title', votes: 0 } },
      },
    };
    const transformedColumns = transformRemoteColumns({ userId: 1, remoteColumns, editCard: { 'card1': true } });
    transformedColumns[0].cards.should.eql([{
      id: 'card1',
      title: 'title',
      votes: 0,
      createdByMe: false,
      editCard: true,
    }]);
  });
});
