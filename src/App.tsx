import './App.css'
import { ParamEditor } from './components/ParamEditor'
import React from 'react';

function App() {

  const params = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' }
  ];

  const model = {
    paramValues: [
      { paramId: 1, value: '' },
      { paramId: 2, value: '' }
    ]
  };

  const editorRef = React.createRef<ParamEditor>();

  const handleSubmit = () => {
    const model = editorRef?.current?.getModel();
    // делаем что-то с полученной моделью, в данном случае просто выводим в консоль 
    console.log(model?.paramValues);
  };

  return (
    <div className={"wrapper"}>
      <ParamEditor ref={editorRef} params={params} model={model} />
      <button className='button' onClick={handleSubmit}>Сохранить</button>
    </div >
  )
}

export default App
