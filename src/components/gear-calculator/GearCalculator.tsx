import { useState } from "react";
import Input from "../ui-components/ui/input";
import Button from "../ui-components/ui/button";
import "./GearCalculator.css"
import Card from "../ui-components/ui/card";
import MachineSelector from "./MachineSelector ";

const GearCalculator = () => {
  const [calculationType, setCalculationType] = useState<"paso" | "modulo">("paso");
  
  const [numTeeth, setNumTeeth] = useState<number | "">("");
  const [k, setK] = useState<number | "">("");
  const [pitch, setPitch] = useState<number | "">("");
  const [module, setModule] = useState<number | "">("");
  const [pressureAngle, setPressureAngle] = useState<number | "">("");
  const [angle, setAngle] = useState<number | "">("");
  const [machineValue, setMachineValue] = useState<number | string>("");
  const [undercutAngle, setUndercutAngle] = useState<number | "">("");
  const [depth, setDepth] = useState<number | null>(null);
  const [factor, setFactor] = useState<number | null>(null);
  const [radius, setRadius] = useState<number | null>(null);

  const calculateGear = () => {
    if (!numTeeth || !pressureAngle || !angle || !undercutAngle || !k || !machineValue || (calculationType === "paso" && !pitch) || (calculationType === "modulo" && !module)) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    let calculatedDepth = 0;
    let calculatedFactor = 0;
    let calculatedRadius = 0;

    if (calculationType === "paso") {
      calculatedDepth = (Number(numTeeth) * Number(pitch)) / (2 * Math.PI) + Number(k);
      calculatedFactor = Math.cos((Number(pressureAngle) * Math.PI) / 180) * (Number(angle) / (Number(undercutAngle) || 1));
      calculatedRadius = (Number(machineValue) * Math.sin((Number(angle) * Math.PI) / 180) * Number(pitch)) / 25.4;
    } else {
      calculatedDepth = 2.25 * Number(module);
      calculatedFactor = Number(module) * Number(numTeeth) * Math.cos((Number(pressureAngle) * Math.PI) / 180);
      calculatedRadius = (Number(machineValue) * Math.sin((Number(angle) * Math.PI) / 180)) / Number(module);
    }

    setDepth(calculatedDepth);
    setFactor(calculatedFactor);
    setRadius(calculatedRadius);
  };

  return (
    <section className="calculator-structure">
      <div className="calculator">
        <div className="">
          <h2>Calculadora de Engranajes</h2>
          <div>
            <label className="">Método de Cálculo:</label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as "paso" | "modulo")}
            >
              <option value="paso">Por Paso</option>
              <option value="modulo">Por Módulo</option>
            </select>
          </div>
          <div className="gear-calculator-form">
            <div>
                <label>Número de dientes</label><br />
                <Input type="number" value={numTeeth} onChange={(e) => setNumTeeth(e.target.value ? Number(e.target.value) : "")} />
            </div>
            <div>
                <label>Coeficiente K</label><br />
                <Input type="number" value={k} onChange={(e) => setK(e.target.value ? Number(e.target.value) : "")} />
            </div>
            <MachineSelector machineValue={machineValue} setMachineValue={setMachineValue} />
            {calculationType === "paso" ? (
              <div>
                <label>Paso</label><br />
                <Input type="number" value={pitch} onChange={(e) => setPitch(e.target.value ? Number(e.target.value) : "")} />
              </div>
            ) : (
              <div>
                <label>Módulo</label><br />
                <Input type="number" value={module} onChange={(e) => setModule(e.target.value ? Number(e.target.value) : "")} />
              </div>
            )}
            <div>
                <label>Ángulo de presión (°)</label><br />
                <Input type="number" value={pressureAngle} onChange={(e) => setPressureAngle(e.target.value ? Number(e.target.value) : "")} />
            </div>
            <div>
                <label>Ángulo</label><br />
                <Input type="number" value={angle} onChange={(e) => setAngle(e.target.value ? Number(e.target.value) : "")} />
            </div>
            <div>
                <label>Ángulo de destalonamiento</label><br />
                <Input type="number" value={undercutAngle} onChange={(e) => setUndercutAngle(e.target.value ? Number(e.target.value) : "")} />
            </div>
            
          </div>
          <Button variant="primary" onClick={calculateGear}>Calcular</Button>
        </div>
      </div>
      <Card title="Resultado" description="Cálculo" className="result">
        {depth !== null && factor !== null && radius !== null && (
          <div>
            <p><strong>Profundidad:</strong> {depth.toFixed(3)}</p>
            <p><strong>Factor:</strong> {factor.toFixed(3)}</p>
            <p><strong>Radio (R):</strong> {radius.toFixed(3)}</p>
          </div>
        )}
      </Card>
      <Card title="Búsqueda rápida" description="Engranajes compatibles o cercanos" className="search">
        asda
      </Card>
    </section>
  );
};

export default GearCalculator;
