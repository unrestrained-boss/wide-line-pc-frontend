import React, {createRef, MouseEvent, useEffect, useState} from "react";
import './ClrSelect.scss';

type TOption = { [s: string]: any };
type TSelectValue = any[] | string;

interface Props {
  name?: string;
  value?: TSelectValue;
  data: TOption[];
  placeholder?: string;
  labelProp?: string;
  valueProp?: string;
  multiple?: boolean;
  onChange?: (s: {
    target: {
      name?: string;
      value: TSelectValue,
    }
  }) => void;
  closeMenuOnSelect?: boolean;
}

function getOptions(options: TOption[], labelProp: string, valueProp: string) {
  return options.map(item => {
    return {
      label: item[labelProp],
      value: item[valueProp],
    };
  });
}

const ClrSelect: React.FC<Props> = (props) => {
  const [show, setShow] = useState(false);
  const [_value, _setValue] = useState<TSelectValue>('');
  const [options, setOptions] = useState<TOption[]>([]);
  const {name, onChange, closeMenuOnSelect = true, placeholder, data, labelProp = 'label', valueProp = 'value'} = props;
  const container = createRef<HTMLDivElement>();
  useEffect(() => {
    _setValue(props.value!);
  }, [props.value]);
  useEffect(() => {
    setOptions(getOptions(data, labelProp, valueProp));
  }, [data, labelProp, valueProp]);
  useEffect(() => {
    function closeAllSelect(e: Event) {
      setTimeout(() => {
        if (!container.current || container.current!.contains(e.target as Element)) {
          return;
        }
        e.stopPropagation();

        if (e.target === container.current) {
          return;
        }
        setShow(false);
      })
    }

    if (show) {
      document.addEventListener("click", closeAllSelect, false);
    } else {
      document.removeEventListener("click", closeAllSelect, false);
    }
    return () => {
      document.removeEventListener("click", closeAllSelect, false);
    };
  }, [container, show]);


  function handleSelectClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setShow(!show);
    }
  }

  function handleSelect(value: TSelectValue) {
    const newVal = value;
    if (Array.isArray(value)) {
    } else {
      _setValue(newVal);
    }
    closeMenuOnSelect && setShow(false);
    onChange && onChange({
      target: {
        name,
        value: newVal,
      }
    });
  }

  return (
    <div tabIndex={0} ref={container} onClick={handleSelectClick} className={"clr-select"}>
      {_value ? _value : placeholder}
      {show && (
        <ul className="clr-select-popup">
          {options.map(item => {
            return (
              <li onClick={() => handleSelect(item.value)}
                  className={`${_value === item.value ? 'active' : ''}`}
                  key={item.value}>{item.label}</li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ClrSelect;
