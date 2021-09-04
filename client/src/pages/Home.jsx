import styled from 'styled-components';

import SimpleModal from '../components/createGoal/CreateGoal';
import Deletemodal from '../components/Deletemodal/Deletemodal';
import BasicModal from '../components/EditGoal/EditGoal';

import Header from '../components/header/Header';
import Mainside from '../components/mainside/Mainside';
import EditMission from '../components/Modal/EditMission';
import EditVision from '../components/Modal/EditVision';
import Nav from '../components/navbar/Navbar';

function App() {
  return (
    <div>
      <SimpleModal />
      <Deletemodal />
      <BasicModal />
      <PluginSide>
        <Nav />
        <Header />
        <Mainside />

        {/* <Deletemodal /> this is rendering above components..whoever is to work on it, should render it conditionally */}
        <EditMission />
        <EditVision />
      </PluginSide>
    </div>
  );
}

export default App;

const PluginSide = styled.div`
  width: 100%;
  background-color: #f6f6f6;
  padding-bottom: 20px;
`;
