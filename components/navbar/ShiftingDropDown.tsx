"use client";

import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FC, PropsWithChildren, useState } from 'react';

import { cn } from '@/lib/utils';

interface TabProps {
  selected: number | null;
  handleSelected: (val: number | null) => void;
  tab: number;
}

type Direction = "right" | "left" | null;
const ShiftingDropDown = () => {
  return (
    <div className="flex h-96 w-full justify-start bg-neutral-950 p-8 text-neutral-200 md:justify-center">
      <Tabs />
    </div>
  );
};
export const Tabs = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [direction, setDirection] = useState<Direction>(null);
  const handleSetSelected = (val: number | null) => {
    if (typeof val === "number" && typeof selected === "number") {
      setDirection((p) => (p === "left" ? "right" : "left"));
    } else if (val === null) {
      setDirection(null);
    }
    setSelected(val);
  };
  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      onClick={() => handleSetSelected(null)}
      className="flex gap-2 relative h-fit"
    >
      {/* TODO: Render all of our tabs */}
      {TABS.map((tab, index) => (
        <Tab
          key={tab.id}
          selected={selected}
          handleSelected={handleSetSelected}
          tab={tab.id}
        >
          {tab.title}
        </Tab>
      ))}

      {/* TODO: Render our content */}
      {/* On lui un entoure d'un `<AnimatePresence></AnimatePresence>` parce que on va utiliser dessus une animation `exit` et on veut que cet animation soit visible, donc on doit dire, attention ici il y a la presence d'une animation, que ce soit d'entrer quand `selected` vaut `true` ou de sortie quand `selected` vaut `false` */}
      <AnimatePresence>
        {selected && <Content dir={direction} selected={selected} />}
      </AnimatePresence>
    </div>
  );
};
const Content: FC<{ selected: number | null; dir: Direction }> = ({
  selected,
  dir,
}) => {
  return (
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 8, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      id="overlay-content"
      // Le top-[calc(100%+24px)] dit ceci, top= 100% de la hauteur du parent auquel tu vas ajouter 24px, donc si par exemple la hauteur du parent vaut 54px alors ca sera 54+24 = 78 donc ici on aura top-[78px]
      className="absolute lef-0 top-[calc(100%_+_24px)] min-w-96 p-4 w-fit rounded-lg border border-neutral-600 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800"
    >
{/* Vus que Le gestionnaire d'événements `onMouseLeave` est défini sur le conteneur parent des onglets de tabulation `Tab` (div de la fonction Tabs). Tant que le curseur se trouve sur l'un des enfants de ce conteneur, y compris `Bridge` ou `Content`, l'événement onMouseLeave ne sera pas déclenché.,En d'autres termes : - Quand le curseur quitte un onglet (Tab) pour passer dans l'espace de Bridge, il ne quitte pas réellement le conteneur parent.
- Cela empêche onMouseLeave de réinitialiser l'état de sélection (selected). Le composant Bridge agit donc comme une extension visuelle et interactive du conteneur parent.
 */}
        <Bridge/>
    </motion.div>
  );
}
const Bridge = ()=>{
    return <div 
    // top-6=24px h-6=24px, to make reference to top-[calc(100%_+_24px)] that `24px`
    className="absolute -top-6 inset-x-0 h-6 bg-inherit"/>
}
export const Tab: FC<PropsWithChildren<TabProps>> = ({
  selected,
  handleSelected,
  tab,
  children,
}) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      className={cn(
        "group flex gap-1 items-center rounded-full px-3 py-1.5 text-sm transition-colors duration-300",
        selected === tab
          ? "bg-neutral-800 text-neutral-100"
          : "text-neutral-400"
      )}
      onMouseEnter={() => handleSelected(tab)}
    >
      <span>{children}</span>
      <ChevronDown
        size="18"
        className="group-hover:-rotate-180 transition-transform duration-300"
      />
    </button>
  );
};
export const ExampleComponent = () => {
  return <div>Hello Framer-motion</div>;
};

export const TABS = [
  {
    title: "Products",
    component: ExampleComponent,
  },
  {
    title: "Pricing",
    component: ExampleComponent,
  },
  {
    title: "Blog",
    component: ExampleComponent,
  },
].map((d, idx) => ({ ...d, id: idx + 1 }));
export default ShiftingDropDown;
