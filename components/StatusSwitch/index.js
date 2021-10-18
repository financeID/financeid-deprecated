import React, { useState, useEffect } from 'react';
import { Switch } from 'react-native';
import { useFormikContext } from 'formik';
import { ButtonContainer, Input, Icon, Line } from './styles';

export default function StatusSwitch({ name, status }) {
  const checkStatus = isNaN(status) !== isNaN() ? status : true;
  const [isEnabled, setIsEnabled] = useState(checkStatus);
  const { setFieldValue } = useFormikContext();

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    setFieldValue(name, isEnabled);
  }, [setFieldValue, isEnabled, checkStatus, name, status]);

  return (
    <React.Fragment>
      <ButtonContainer>
        <Input>
          {isEnabled ? (
            <Input>Valor recebido</Input>
          ) : (
            <Input>Não foi recebido</Input>
          )}
        </Input>

        <Icon>
          <Switch
            style={{
              transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
            }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </Icon>
      </ButtonContainer>
      <Line />
    </React.Fragment>
  );
}
