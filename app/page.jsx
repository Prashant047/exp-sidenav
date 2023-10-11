"use client"

import { useState, useEffect } from 'react';

import { RiDashboardLine } from 'react-icons/ri';
import { MdOutlineAutoGraph } from 'react-icons/md';
import { AiOutlineEuroCircle } from 'react-icons/ai';
import { BsBookmarkCheck } from 'react-icons/bs';
import { CgArrangeBack } from 'react-icons/cg';
import { BiReceipt } from 'react-icons/bi';
import { TbReportAnalytics } from 'react-icons/tb';
import { VscFolder } from 'react-icons/vsc';
import { MdLogout } from 'react-icons/md';
import { MdPermIdentity } from 'react-icons/md';

import { useSideNav, SideNavContextProvider } from './SideNavContext';

const navData = [
  {
    name: 'Dashboard',
    icon: <RiDashboardLine/>
  },
  {
    name: 'Manage',
    icon: <MdOutlineAutoGraph/>
  },
  {
    name: 'Quotes',
    icon: <AiOutlineEuroCircle/>
  },
  {
    name: 'Bookings',
    icon: <BsBookmarkCheck/>
  },
  {
    name: 'Orders',
    icon: <CgArrangeBack/>
  },
  {
    name: 'Billings',
    icon: <BiReceipt/>
  },
  {
    name: 'Reports',
    icon: <TbReportAnalytics/>,
    pendingNum: 42
  },
  {
    name: 'File Manager',
    icon: <VscFolder/>
  },
]


export default function Home(){
  return (
    <SideNavContextProvider>
      <SideNav/>
    </SideNavContextProvider>
  );
}

function SideNav() {
  const { isExpanded , setNavExpand} = useSideNav();

  return (
    <main className="flex w-full h-screen bg-slate-900 text-slate-200">
      <nav className={`${isExpanded?'w-60 p-4':'w-24 p-2'} w-60 flex flex-col`}>
        <NavProfileCard/>
        <ul className={`${isExpanded?'':'px-4'}`}>
          {
            navData.map((nav, index) => 
              <NavItem 
                key={`${nav.name}-${index}`}
                icon={nav.icon}
                pendingNum={nav.pendingNum}
              >
                {nav.name}
              </NavItem>)
          }
        </ul>
        <button className='flex justify-center items-center mt-auto mb-2 border rounded-md py-2 border-neutral-800' onClick={() => setNavExpand(!isExpanded)}>
          <i><MdLogout/></i> 
          {isExpanded && <span className='mx-2'>Toggle Expanded</span>}
        </button>
      </nav>
      <div className=" bg-blue-500 flex-1 border-2 border-gray-900">

      </div>
    </main>
  );
}

function NavProfileCard(){
  const { isExpanded } = useSideNav();

  return (
    <div className={`flex flex-col rounded-lg ${isExpanded?'overflow-hidden':'mt-8'} mb-4`}>
      {isExpanded && (
        <div className='h-20 bg-green-600 '>
        </div>
      )}

      <div className={`flex ${isExpanded?'flex-row':'flex-col'} items-center justify-start bg-slate-800`}>
        <span className='flex flex-col justify-start items-center m-2'>
          <span className='text-sm leading-none tracking-wider'><b className='text-slate-500 font-semibold'>$</b>34321</span>
          <small className='text-[0.75rem] text-slate-500 font-semibold'>Budget</small>
        </span>
        <figure className={`${isExpanded?'':'order-first'} bg-slate-900 h-16 w-16 outline outline-gray-800 outline-2 rounded-md -translate-y-5`}>
          <img className='w-full' src="https://api.dicebear.com/5.x/personas/svg" alt="" />
        </figure>
        <span className='flex flex-col justify-start items-center m-2'>
          <span className='text-sm leading-none tracking-wider'><b className='text-slate-500 font-semibold'>$</b>6321</span>
          <small className='text-[0.75rem] text-slate-500 font-semibold'>Spent</small>
        </span>
      </div>

      {isExpanded && (
        <div className=' px-4 bg-slate-800 '>
          <div className='flex flex-col items-center border-b border-slate-900'>
            <h4 className='text-[0.75rem] text-slate-400'>
              Welcome
            </h4>
            <h1>
              Antonio John
            </h1>
            <h3 className='text-[0.8rem] text-green-500 leading-loose mb-2'>
              CEO
            </h3>
          </div>
        </div>
      )}

      <div className='bg-slate-800 p-2'>
        <button className='flex justify-center items-center bg-slate-900 rounded-lg w-full py-2 text-sm font-semibold hover:bg-green-500'>
          {isExpanded?'My Profile': <i><MdPermIdentity/></i>}
        </button>
      </div>
    </div>
  );
}

function NavItem({ children, icon, pendingNum }) {
  const [ isHovering, setIsHovering ] = useState(false);
  const { isExpanded } = useSideNav();
  
  // useEffect(() => {
  //   console.log(isHovering);
  // }, [isHovering]);
  
  return (
    <li
      className={
        `relative flex ${isExpanded?'justify-between':'justify-center'} items-center px-4 py-2 rounded-lg my-1 font-semibold 
         group hover:bg-green-100 hover:text-green-500 hover:cursor-pointer
        `
      }
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {!isExpanded && isHovering && (
        <div className='absolute flex justify-start items-center w-full h-full'>
          <span className='flex-none text-[0.7rem] translate-x-14 bg-green-500 px-2 py-1 rounded-[1rem] text-slate-200'>{ children }</span>
        </div>
      )}
      <div className={`flex items-center ${isExpanded?'justify-start':' justify-center'} "`}>
        <i className='w-4 h-4 flex justify-center items-center'> {icon} </i>
        {isExpanded && <span className='ml-2'>{ children }</span>}
      </div>
      {pendingNum && isExpanded && <span className='bg-green-500 text-[0.7rem] text-slate-200 font-semibold px-2 align-middle rounded-lg'>42</span>}
    </li>
  );
}
