"use client";

import React, { memo, useState } from "react";

const mockParams: Param[] = [
  {
    id: 0,
    name: "Назначение",
    type: "string",
  },
  {
    id: 1,
    name: "Длина",
    type: "string",
  },
];

const mockModel: Model = {
  paramValues: [
    { paramId: 0, value: "повседневное" },
    { paramId: 1, value: "макси" },
  ],
};

interface Param {
  id: number;
  name: string;
  type: "string"; // Можно расширить для других типов (например, "number", "select")
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface TextInputParams extends ParamValue {
  onChange: (params: ParamValue) => void;
}

interface Model {
  paramValues: ParamValue[];
  //colors: Color
}

interface Props {
  params: Param[];
  model: Model;
}

const TextParamInput = memo((params: TextInputParams) => {
  const handleChange = (newValue: string) => {
    params.onChange({ paramId: params.paramId, value: newValue });
  };
  return (
    <input
      type="text"
      value={params.value}
      onChange={(e) => handleChange(e.target.value)}
      className="border px-2"
    />
  );
});

const ParamEditor = (props: Props) => {
  const { params, model } = props;

  const [currentModel, setModel] = useState<Model>(model);

  const getModel = () => {
    alert(JSON.stringify(currentModel));
    return currentModel;
  };

  const handleChange = ({ paramId, value }: ParamValue) => {
    const updatedModel = currentModel.paramValues.map((param) =>
      param.paramId === paramId ? { ...param, value } : param
    );
    setModel({ paramValues: updatedModel });
  };

  return (
    <div className="flex gap-5 flex-col max-w-fit">
      <ul className="flex flex-col gap-3">
        {params.map((item) => (
          <li className="flex gap-5 items-center" key={item.id}>
            <label className="font-bold w-[150px] text-center">{item.name}</label>
            {item.type === "string" && (
              <TextParamInput
                paramId={item.id}
                value={
                  currentModel.paramValues.find((itemModel) => itemModel.paramId === item.id)!.value
                }
                onChange={handleChange}
              />
            )}
            {/* Тут нужно будет добавить инпуты для иных типов и создать под них компоненты */}
          </li>
        ))}
      </ul>
      <button
        onClick={getModel}
        className="border p-1 bg-slate-300 hover:bg-slate-200 transition-colors duration-150"
      >
        Show Model
      </button>
    </div>
  );
};

const Container = () => {
  return (
    <div className="flex flex-col gap-5 p-10">
      <h2 className="text-lg">Редактор параметров</h2>
      <ParamEditor params={mockParams} model={mockModel} />
    </div>
  );
};

export default Container;
