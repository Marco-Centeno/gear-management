import { useState } from "react";
import Input from "../ui-components/ui/input";
import Button from "../ui-components/ui/button";
import "./GearCalculator.css"
import Card from "../ui-components/ui/card";
import MachineSelector from "./MachineSelector ";
import Alert from "../ui-components/ui/alert";
import { lazy, Suspense } from "react";

const listaDientes: number[] = [
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 34, 36, 38, 40, 42, 44, 45, 46, 48, 50,
  52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 105, 110, 115, 120,
  125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200, 210, 220, 230, 240, 250, 260, 270, 280,
  290, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 400, 410, 420, 430, 440, 450, 460, 470, 480, 490, 500, 520, 540,
  560, 580, 600, 620, 640, 660, 680, 700, 720, 750, 780, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350,
  1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000
];

type GearCombination = [number, number, number];

const GearCalculator = () => {
  const [calculationType, setCalculationType] = useState<"paso" | "modulo">("paso");
  
  const [numTeeth, setNumTeeth] = useState<number | "">("");
  //const [k, setK] = useState<number | "">("");
  const [pitch, setPitch] = useState<number | "">("");
  const [module, setModule] = useState<number | "">("");
  const [pressureAngle, setPressureAngle] = useState<number | "">("");
  const [angle, setAngle] = useState<number | "">("");
  const [machineValue, setMachineValue] = useState<number | string>("");
  const [undercutAngle, setUndercutAngle] = useState<number | "">("");
  const [depth, setDepth] = useState<number | null>(null);
  const [factor, setFactor] = useState<number | null>(null);
  const [radius, setRadius] = useState<number | null>(null);
  const [tolerancy, setTolerancy] = useState<number | "">(0.5);
  // combinations //
  const [combinations, setCombinations] = useState<[number, number, number][]>([]);
  const [bestCombinations, setBestCombinations] = useState<[number, number, number][]>([]);
  
  
/*
const searchGearCombinations = (factorDeseado: number, tolerancia: number): [number, number, number][] => {
  const combinaciones: [number, number, number][] = [];
  listaDientes.forEach(z1 => {
    listaDientes.forEach(z2 => {
      const factorReal = z2 / z1;
      if (Math.abs(factorReal - factorDeseado) <= tolerancia) {
        combinaciones.push([z1, z2, factorReal]);
      }
    });
  });
  return combinaciones;
};*/

const searchGearCombinations = (factor: number, tolerancy: number): GearCombination[] => {
  return listaDientes.flatMap(z1 =>
    listaDientes
      .map(z2 => [z1, z2, z2 / z1] as GearCombination)
      .filter(([_, __, RealFactor]) => Math.abs(RealFactor - factor) <= tolerancy)
  );
};

  const calculateGear = () => {
    if (!tolerancy || !numTeeth || !pressureAngle || !angle || !machineValue || (calculationType === "paso" && !pitch) || (calculationType === "modulo" && !module)) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    if (tolerancy >= 100){
      alert("Por favor, use una tolerancia menor a 100");
      return;
    }

    let calculatedDepth = 0;
    let calculatedFactor = 0;
    let calculatedRadius = 0;

    if (calculationType === "paso") {
      if (!undercutAngle){ alert("Por favor, completa todos los campos requeridos."); return; }
      calculatedDepth = (Number(numTeeth) * Number(pitch)) / (2 * Math.PI) + Number(machineValue);
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
    setCombinations(searchGearCombinations(calculatedFactor, tolerancy));

    const BestCombinationsGrouop = combinations.sort((a, b) => Math.abs(a[2] - calculatedFactor) - Math.abs(b[2] - calculatedFactor)).slice(0, 5);
    setBestCombinations(BestCombinationsGrouop);
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
                <Input type="number" value={machineValue} onChange={(e) => setMachineValue(e.target.value ? Number(e.target.value) : "")} />
            </div>
            <div>
              <MachineSelector machineValue={machineValue} setMachineValue={setMachineValue} />
            </div>
            
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
                <label>Grados</label><br />
                <Input type="number" value={angle} onChange={(e) => setAngle(e.target.value ? Number(e.target.value) : "")} />
            </div>
            <div>
                <label>Ángulo de destalonamiento</label><br />
                <Input disabled={calculationType != "paso" ? true : false} type="number" value={undercutAngle} onChange={(e) => setUndercutAngle(e.target.value ? Number(e.target.value) : "")} />
            </div>
            <div>
                <label>Tolerancia para las combinaciones</label><br />
                <Input type="number" value={tolerancy} onChange={(e) => setTolerancy(e.target.value ? Number(e.target.value) : "")} />
            </div>
          </div>
          <Button variant="primary" onClick={calculateGear}>Calcular</Button>
        </div>
        <br />
        <hr />
        <br />
        <h2>Combinaciones: {combinations.length}</h2>
        <br />
        <section className="combinations">
        {combinations.length > 0 ? (
            combinations.map(([z1, z2, factor], index) => (
              <Card children={" "} key={index} title={`Z1: ${z1}, Z2: ${z2}`} description={`Relación: ${factor.toFixed(3)}`} />
            ))
          ) : (
            <Card children={" "} title="Sin resultados" description="No se encontraron combinaciones dentro del margen de tolerancia."/>
          )}
        </section>
      </div>
      <Card title="Resultado" description="Cálculo" className="result">
        {depth !== null && factor !== null && radius !== null && (
          <div>
            <p><strong>Profundidad:</strong> {depth.toFixed(3)}</p>
            <p><strong>Factor:</strong> {factor.toFixed(3)}</p>
            <p><strong>Radio (R):</strong> {radius.toFixed(3)}</p>
            <br /><hr /><br />
            <h2>Recomendaciones</h2>
            <br />
            <div className="seach">
              {bestCombinations.map(([z1, z2, factor], index) => (
                <Alert variant="info" >
                  <p key={index}>Z1: {z1}, Z2: {z2}, Relación: {factor.toFixed(3)}</p>
                </Alert>                
              ))}
            </div>
            
          </div>
        )}
      </Card>
      
    </section>
  );
};

export default GearCalculator;
