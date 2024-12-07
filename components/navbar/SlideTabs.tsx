import { FC, PropsWithChildren } from 'react';

const SlideTabs = () => {
  return (
    <ul className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1">
      <Tab>Home</Tab>
      <Tab>Pricing</Tab>
      <Tab>Features</Tab>
      <Tab>Docs</Tab>
      <Tab>Blog</Tab>
    </ul>
  )
}
export const SlideTabsExample = () => {
    return <div className="grid h-screen place-content-center bg-neutral-100">
        <SlideTabs/>
    </div>
}
export const Tab:FC<PropsWithChildren> = ({children})=>{
    return <li className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1">{children}</li>
}
export default SlideTabs
