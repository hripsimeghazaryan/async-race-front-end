/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useContext, useState } from 'react';
import RacingLine from './RacingLine';
import { GarageType } from '../interfaces/GarageType';
import { GarageDataContext } from '../contexts/garage-data';

function RacingField(props: {toUpdate: (id: number) => void}) {
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const { cars } = useContext(GarageDataContext) as GarageType;

  const onSelect = (id: number) => {
    setIsSelected(isSelected === id ? null : id);
    props.toUpdate(id);
  };

  return (
    <div className="racing-field">
      {
            cars?.map((item) => (
              <RacingLine
                car={item}
                select={isSelected === item.id}
                onSelect={onSelect}
              />
            ))
        }
    </div>
  );
}

export default RacingField;
