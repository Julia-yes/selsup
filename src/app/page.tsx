"use client";

import React, { Component } from "react";

interface Param {
  id: number;
  name: string;
  type: "string"; // Можно расширить для других типов (например, "number", "select")
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  //colors: Color
}

interface TextInputParams extends ParamValue {
  onChange: (params: ParamValue) => void;
}

interface Props {
  params: Param[];
  model: Model;
}

const mockParams: Param[] = [
  { id: 0, name: "Назначение", type: "string" },
  { id: 1, name: "Длина", type: "string" },
];

const mockModel: Model = {
  paramValues: [
    { paramId: 0, value: "повседневное" },
    { paramId: 1, value: "макси" },
  ],
};

class TextParamInput extends Component<TextInputParams> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ paramId: this.props.paramId, value: event.target.value });
  };

  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        onChange={this.handleChange}
        className="border px-2"
      />
    );
  }
}

class ParamEditor extends Component<Props, { currentModel: Model }> {
  constructor(props: Props) {
    super(props);
    this.state = { currentModel: props.model };
  }

  public getModel = () => {
    return this.state.currentModel;
  };

  handleChange = ({ paramId, value }: ParamValue) => {
    const updatedModel = this.state.currentModel.paramValues.map((param) =>
      param.paramId === paramId ? { ...param, value } : param
    );
    this.setState({ currentModel: { paramValues: updatedModel } });
  };

  render() {
    return (
      <ul className="flex flex-col gap-3">
        {this.props.params.map((item) => (
          <li className="flex gap-5 items-center" key={item.id}>
            <label className="font-bold w-[150px] text-center">{item.name}</label>
            {item.type === "string" && (
              <TextParamInput
                paramId={item.id}
                value={
                  this.state.currentModel.paramValues.find(
                    (itemModel) => itemModel.paramId === item.id
                  )!.value
                }
                onChange={this.handleChange}
              />
            )}
            {/* Тут нужно будет добавить инпуты для иных типов и создать под них компоненты */}
          </li>
        ))}
      </ul>
    );
  }
}

class Container extends Component {
  render() {
    return (
      <div className="flex flex-col gap-5 p-10">
        <h2 className="text-lg">Редактор параметров</h2>
        <ParamEditor params={mockParams} model={mockModel} />
      </div>
    );
  }
}

export default Container;
