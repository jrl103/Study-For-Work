import React from 'react';

interface Car {
  name: string;
  speed: number;
  move: () => void;
}

interface Props<T> {
  car: T;
}

export default function CarComponent<T extends Car>({ car }: Props<T>) {
  const [effect, setEffect] = React.useState<T>(car);
  React.useEffect(() => {
    setEffect((prev) => ({ ...prev, name: `${prev.name} car` }));
    effect.move();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>{effect.name}</div>;
}

interface BrandCar extends Car {
  brandName: string;
}

interface SpecialBrandCar extends BrandCar {
  isSpecial: boolean;
}

function Main() {
  const audi: BrandCar = {
    name: 'audi A8',
    brandName: 'audi',
    speed: 180,
    move: () => {
      console.log('audi car is Move');
    },
  };

  const benz: BrandCar = {
    name: 'benz S Class',
    brandName: 'benz',
    speed: 190,
    move: () => {
      console.log('benz car is Move');
    },
  };

  const ferrari: SpecialBrandCar = {
    name: 'ferrari F12',
    brandName: 'ferrari',
    speed: 200,
    move: () => {
      console.log('so special ferrari is Move');
    },
    isSpecial: true,
  };

  return (
    <>
      <CarComponent<BrandCar> car={audi} />
      <CarComponent<BrandCar> car={benz} />
      <CarComponent<SpecialBrandCar> car={ferrari} />
    </>
  );
}

<Main />;
