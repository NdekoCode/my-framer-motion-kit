"use client";

import { ChartBar, ChartPie, ChevronDown, ChevronRight, House } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { Dispatch, FC, PropsWithChildren, SetStateAction, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface TabProps {
  selected: number | null;
  handleSelected: (val: number | null) => void;
  tab: number;
  setPosition: Dispatch<SetStateAction<ItemPosition>>;
  setTriangleLeftPosition: Dispatch<SetStateAction<number>>;
}
interface ItemPosition {
  left: number;
  opacity: number;
  width: number;
  className?: string;
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
  const [cursorPosition, setCursorPosition] = useState<ItemPosition>({
    left: 0,
    opacity: 0,
    width: 0,
    className: "",
  });
  const [triangleLeftPosition, setTriangleLeftPosition] = useState(24);
  const handleSetSelected = (val: number | null) => {
    if (typeof val === "number" && typeof selected === "number") {
      setDirection(selected > val ? "right" : "left");
    } else if (val === null) {
      setDirection(null);
    }
    setSelected(val);
  };
  const handleMouseLeave = () => {
    handleSetSelected(null);
    setCursorPosition((p) => ({ ...p, opacity: 0 }));
  };
  return (
    <div
      onMouseLeave={handleMouseLeave}
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
          setPosition={setCursorPosition}
          setTriangleLeftPosition={setTriangleLeftPosition}
        >
          {tab.title}
        </Tab>
      ))}
      <Cursor position={cursorPosition} />

      {/* TODO: Render our content */}
      {/* On lui un entoure d'un `<AnimatePresence></AnimatePresence>` parce que on va utiliser dessus une animation `exit` et on veut que cet animation soit visible, donc on doit dire, attention ici il y a la presence d'une animation, que ce soit d'entrer quand `selected` vaut `true` ou de sortie quand `selected` vaut `false` */}
      <AnimatePresence>
        {selected && (
          <Content
            dir={direction}
            selected={selected}
            position={triangleLeftPosition}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const Cursor: FC<{ position: ItemPosition }> = ({ position }) => {
  return (
    <motion.span
    initial={false}
      className={cn(
        "absolute z-[1] top-1/2 -translate-y-1/2 h-7 rounded-full  bg-neutral-800 w-16",
        position.className
      )}
      animate={{ ...position }}
      transition={{
        duration:0.35,
        ease:"easeInOut"
      }}
    />
  );
};

const Content: FC<{
  selected: number | null;
  dir: Direction;
  position: number;
}> = ({ position, selected, dir }) => {
  const directionContent = {
    // Si on est entrain d'aller vers la gauche alors on fait un translate vers la droite, si on est entrain d'aller vers la droite alors on fait un translate vers la gauche sinon on ne fait rien, on ne fait rien quand `dir` ===null
    right: -100,
    left: 100,
    null: 0,
  };
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
      <Bridge />
      <RoundedTriangle selected={selected} leftPosition={position} />
      {TABS.map((tab) => (
        <div key={tab.id} className="overflow-hidden">
          {selected === tab.id ? (
            <motion.div
              initial={{
                x: directionContent[dir!],
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                // Si on est entrain d'aller vers la gauche alors on fait un translate vers la droite
                x: directionContent[dir!],
                opacity: 0,
              }}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
              }}
            >
              {<tab.component />}
            </motion.div>
          ) : null}
        </div>
      ))}
    </motion.div>
  );
};
const Bridge = () => {
  return (
    <div
      // top-6=24px h-6=24px, to make reference to top-[calc(100%_+_24px)] that `24px`
      className="absolute -top-6 inset-x-0 h-6 bg-inherit"
    />
  );
};

const RoundedTriangle: FC<{
  selected: number | null;
  leftPosition: number;
}> = ({ selected, leftPosition }) => {
  return (
    <motion.span
      className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 size-4 rounded-tl rotate-45 bg-neutral-900 border border-neutral-600 z-0"
      style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%, 0 100%)" }}
      initial={false}
      animate={{
        left: leftPosition,
      }}
    />
  );
};
export const Tab: FC<PropsWithChildren<TabProps>> = ({
  selected,
  handleSelected,
  tab,
  children,
  setPosition,
  setTriangleLeftPosition,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const handlePosition = () => {
    if (!ref.current) return;
    const { width } = ref.current.getBoundingClientRect();
    setPosition((p) => ({
      ...p,
      width,
      left: ref.current ? ref.current.offsetLeft : 0,
      opacity: 1,
      className: selected === tab ? "bg-neutral-800" : "",
    }));
    setTriangleLeftPosition(
      ref.current ? ref.current.offsetLeft + ref.current.offsetWidth - 48 : 48
    );
  };
  const handleMouseEnter = () => {
    handleSelected(tab);

    handlePosition();
  };
  return (
    <button
      id={`shift-tab-${tab}`}
      ref={ref}
      className={cn(
        "group flex gap-1 items-center rounded-full px-3 py-1.5 text-sm transition-colors duration-300 relative z-[2]",
        selected === tab ? "text-neutral-100" : "text-neutral-400"
      )}
      onMouseEnter={handleMouseEnter}
    >
      <span>{children}</span>
      <ChevronDown
        size="18"
        className="group-hover:-rotate-180 transition-transform duration-300"
      />
    </button>
  );
};
const Products = () => {
    return (
      <div>
        <div className="flex gap-4">
          <div>
            <h3 className="mb-2 text-sm font-medium">Startup</h3>
            <a href="#" className="mb-1 block text-sm text-neutral-400">
              Bookkeeping
            </a>
            <a href="#" className="block text-sm text-neutral-400">
              Invoicing
            </a>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Scaleup</h3>
            <a href="#" className="mb-1 block text-sm text-neutral-400">
              Live Coaching
            </a>
            <a href="#" className="mb-1 block text-sm text-neutral-400">
              Reviews
            </a>
            <a href="#" className="block text-sm text-neutral-400">
              Tax/VAT
            </a>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Enterprise</h3>
            <a href="#" className="mb-1 block text-sm text-neutral-400">
              White glove
            </a>
            <a href="#" className="mb-1 block text-sm text-neutral-400">
              SOX Compliance
            </a>
            <a href="#" className="block text-sm text-neutral-400">
              Staffing
            </a>
            <a href="#" className="block text-sm text-neutral-400">
              More
            </a>
          </div>
        </div>
  
        <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
          <span>View more</span>
          <ChevronRight />
        </button>
      </div>
    );
  };
  
  const Pricing = () => {
    return (
      <div className="grid grid-cols-3 gap-4 divide-x divide-neutral-700">
        <a
          href="#"
          className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
        >
            <House className="mb-2 text-xl text-indigo-300"  />
          <span className="text-xs">Startup</span>
        </a>
        <a
          href="#"
          className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <ChartBar className="mb-2 text-xl text-indigo-300" />
          <span className="text-xs">Scale Up</span>
        </a>
        <a
          href="#"
          className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
        >
            <ChartPie className="mb-2 text-xl text-indigo-300" />
          <span className="text-xs">Enterprise</span>
        </a>
      </div>
    );
  };
  
  const Blog = () => {
    return (
      <div>
        <div className="grid grid-cols-2 gap-2">
          <a href="#">
            <Image
              className="mb-2 h-14 w-full rounded object-cover"
              src="/imgs/blog/4.png"
              width={550}
              height={550}
              alt="Placeholder image"
            />
            <h4 className="mb-0.5 text-sm font-medium">Lorem ipsum dolor</h4>
            <p className="text-xs text-neutral-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo
              quidem eos.
            </p>
          </a>
          <a href="#">
            <Image
              className="mb-2 h-14 w-full rounded object-cover"
              src="/imgs/blog/5.png"
              alt="Placeholder image"
              width={550}
              height={550}
            />
            <h4 className="mb-0.5 text-sm font-medium">Lorem ipsum dolor</h4>
            <p className="text-xs text-neutral-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo
              quidem eos.
            </p>
          </a>
        </div>
        <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
          <span>View more</span>
          <ChevronRight />
        </button>
      </div>
    );
  };

export const TABS = [
  {
    title: "Products",
    component: Products,
  },
  {
    title: "Pricing",
    component: Pricing,
  },
  {
    title: "Blog",
    component: Blog,
  },
].map((d, idx) => ({ ...d, id: idx + 1 }));
export default ShiftingDropDown;
