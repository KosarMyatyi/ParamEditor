import React from "react";
import '../App.css'

// Интерфейсы описывающие структуру данных
interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  model: Model;
}

// Компонент редактора параметров
export class ParamEditor extends React.Component<Props, State> {
  // Храним локальную модель в state, изначально из props
  state = {
    model: this.props.model
  };
  // Обрабатываем изменение значения параметра
  handleChange = (paramId: number, value: string) => {
    const { model } = this.state;
    // Находим измененный параметр в модели  
    const paramIndex = model.paramValues.findIndex(pv => pv.paramId === paramId);
    let newModel;

    if (paramIndex !== -1) {
      const newParamValues = [...model.paramValues];
      newParamValues[paramIndex] = { paramId, value };
      newModel = { ...model, paramValues: newParamValues };
    } else {
      // Создаем новый объект модели с обновленным значением
      newModel = {
        ...model,
        paramValues: [...model.paramValues, { paramId, value }]
      };
    }

    // Обновляем модель в state
    this.setState({ model: newModel });
  }

  // Возвращаем текущую модель
  getModel = () => {
    return this.state.model;
  }

  // Обнуляет значения после их сохранения
  reset = () => {
    this.setState({
      model: {
        paramValues: []
      }
    });
  }

  render() {
    const { params } = this.props;
    const { model } = this.state;

    // Отрисовываем инпут для каждого параметра
    return (
      <div className="wrapper">
        {params.map(param => {
          const value = model.paramValues.find(pv => pv.paramId === param.id)?.value;

          return (
            <div className="block" key={param.id}>
              <label className="label">{param.name}</label>
              <input
                value={value || ''}
                onChange={e => this.handleChange(param.id, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}