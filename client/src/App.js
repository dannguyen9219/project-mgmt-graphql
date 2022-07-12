import Header from "./components/Header";
import Clients from "./components/Clients";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import AddClientModal from "./components/AddClientModal";


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});
// Adding a merge cache function to update client/projects list when deleting a client/project instead of re-fetching data. Then call cache in client function below


const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClientModal />
          <Clients />
        </div>
      </ApolloProvider>
      
      
    </>
    
  );
}

export default App;
