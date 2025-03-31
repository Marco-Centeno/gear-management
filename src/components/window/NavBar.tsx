import { Calculator, Cog, HardDrive, Home, User } from 'lucide-react'
import { useState } from 'react'
import '../window/NavBar.css'

function NavBar() {
    const [navigation, setNavigation] = useState<string>("Home");

  return (
    <section className="menu-content">
    <center className='menu-title'>
      <strong>
        Opciones 
      </strong>
    </center>
    <hr />
    <a href="/#/" onClick={() => (setNavigation('Home'))} className={navigation == 'Home' ? 'navigation-selected' : ''} >
      <Home/> <span>Home</span>
    </a>
    <a href="/#/gear-calculator" onClick={() => (setNavigation('Calculator'))} className={navigation == 'Calculator' ? 'navigation-selected' : ''} >
      <Calculator/> <span>Calculator</span>
    </a>
    <a href="/#/gear-universe" onClick={() => (setNavigation('Universe'))} className={navigation == 'Universe' ? 'navigation-selected' : ''}>
      <Cog/> <span>Universo</span>
    </a>
    <a href="/#/user-list" onClick={() => (setNavigation('DataManagement'))} className={navigation == 'DataManagement' ? 'navigation-selected' : ''}>
      <HardDrive/> <span>Datos</span> 
    </a>
    <a href="/#/client-manager" onClick={() => (setNavigation('Clients'))} className={navigation == 'ClientManager' ? 'navigation-selected' : ''}>
      <User/> <span>Clientes</span>
    </a>
    <a href="/#/universe" onClick={() => (setNavigation('DbTest'))} className={navigation == 'DbTest' ? 'navigation-selected' : ''}>
      <User/> <span>DB Test</span> 
    </a>
  </section>
  )
}

export default NavBar