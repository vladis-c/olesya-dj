import {Children, ReactElement, cloneElement} from 'react';

type AnimatedLifeGridProps = {
  children: React.ReactNode;
};

export default function AnimatedLifeGrid({children}: AnimatedLifeGridProps) {
  const childrenWithProps = Children.map(children, (child, index) => {
    if (child && typeof child === 'object' && 'props' in child) {
      const element = child as ReactElement;
      return cloneElement(element, {
        ...(element.props as object),
        key: index,
      });
    }
    return child;
  });

  return (
    <div className="flex flex-wrap w-screen justify-center items-center gap-8 md:px-48">
      {childrenWithProps}
    </div>
  );
}
