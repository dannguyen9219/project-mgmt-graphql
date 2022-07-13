import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import AddClientModal from "./components/AddClientModal";
import Header from "./components/Header";
import Home from "./pages/Home";

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
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />

            </Routes>
          </div>
        </Router>
      </ApolloProvider>
      
      
    </>
    
  );
};

export default App;
