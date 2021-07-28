import { gql } from "apollo-boost";

export const meQuery = gql`
  query {
    me {
      _id
      email
      role
    }
  }
`;

export const meQueryStr = `
  query {
    me {
      _id
      email
      role
    }
  }
`;

export const sheetQuery = gql`
  query {
    sheet {
      _id
      userId
      day
      gratefulFor
      research
      reading {
        title
        start
        end
      }
      accountability {
        done
        todo
      }
      awake
      asleep
    }
  }
`;

export const sheetQueryStr = `
  query SheetQuery($id: ID) {
    sheet(id: $id) {
      _id
      userId
      day
      gratefulFor
      affirmation
      callSos
      research
      reading {
        title
        start
        end
      }
      accountability {
        done
        todo
      }
      awake
      asleep
      todos {
        today {
          _id
          items {
            _id
            title
            completed
            actions {
              _id
              text
              completed
            }
          }
          startTime
          endTime
        }
        tomorrow {
          _id
          items {
            _id
            title
            completed
            actions {
              _id
              text
              completed
            }
          }
          startTime
          endTime
        }
        work {
          _id
          items {
            _id
            title
            completed
            actions {
              _id
              text
              completed
            }
          }
          startTime
          endTime
        }
        art {
          _id
          items {
            _id
            title
            completed
            actions {
              _id
              text
              completed
            }
          }
          startTime
          endTime
        }
      }
    }
  }
`;

export const journalQueryStr = `
  query JournalQuery($id: ID) {
    journal(id: $id) {
      _id
      userId
      thoughts {
        today {
          _id
          items {
            _id
            title
            completed
            actions {
              _id
              text
              completed
            }
          }
          startTime
          endTime
        }
      }
    }
  }
`;

export const expensesQuery = gql`
  query {
    expenses {
      _id
      type
      description
      amount
    }
  }
`;

export const journalsQuery = gql`
  query {
    journals {
      _id
      items {
        _id
        title
        completed
        actions {
          _id
          text
          completed
        }
      }
      startTime
      endTime
    }
  }
`;

export const journalsQueryStr = `
  query {
    journals {
      _id
      items {
        _id
        title
        completed
        actions {
          _id
          text
          completed
        }
      }
      startTime
      endTime
    }
  }
`;
