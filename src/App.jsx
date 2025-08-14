import { users } from "../data";
import BasicTable from "./components/Table";

function App() {
  console.log(users);
  return (
    <>
      <BasicTable data={users} />
    </>
  );
}

export default App;
