/*"use client"

import { useState } from "react"
import Button from "@/components/ui/button"
import Card from "@/components/ui/card"
import Badge from "@/components/ui/badge"
import Alert from "@/components/ui/alert"
import Avatar from "@/components/ui/avatar"
import Input from "@/components/ui/input"
import Textarea from "@/components/ui/textarea"
import Checkbox from "@/components/ui/checkbox"
import Radio from "@/components/ui/radio"
import Select from "@/components/ui/select"
import Switch from "@/components/ui/switch"
import Slider from "@/components/ui/slider"
import Progress from "@/components/ui/progress"
import Spinner from "@/components/ui/spinner"
import Tooltip from "@/components/ui/tooltip"
import Modal from "@/components/ui/modal"
import Tabs from "@/components/ui/tabs"
import Accordion from "@/components/ui/accordion"
import Dropdown from "@/components/ui/dropdown"
import ThemeToggle from "@/components/ui/theme-toggle"
import { TooltipProvider } from "@/components/ui/tooltip"

import "./component-catalog.css"

export default function ComponentCatalog() {
  const [activeTab, setActiveTab] = useState("buttons")
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="component-catalog">
      <header className="catalog-header">
        <div className="catalog-header-content">
          <h1>Catálogo de Componentes</h1>
          <p>Una colección de componentes UI reutilizables con CSS puro y React</p>
          <ThemeToggle />
        </div>
      </header>

      <div className="catalog-tabs">
        <button
          className={`tab-button ${activeTab === "buttons" ? "active" : ""}`}
          onClick={() => setActiveTab("buttons")}
        >
          Botones
        </button>
        <button className={`tab-button ${activeTab === "forms" ? "active" : ""}`} onClick={() => setActiveTab("forms")}>
          Formularios
        </button>
        <button
          className={`tab-button ${activeTab === "feedback" ? "active" : ""}`}
          onClick={() => setActiveTab("feedback")}
        >
          Feedback
        </button>
        <button className={`tab-button ${activeTab === "data" ? "active" : ""}`} onClick={() => setActiveTab("data")}>
          Datos
        </button>
        <button
          className={`tab-button ${activeTab === "navigation" ? "active" : ""}`}
          onClick={() => setActiveTab("navigation")}
        >
          Navegación
        </button>
      </div>

      <div className="catalog-content">
        {activeTab === "buttons" && (
          <div className="component-grid">
            <Card title="Botones Básicos" description="Variantes de botones para diferentes acciones">
              <div className="component-demo">
                <Button>Default</Button>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="info">Info</Button>
                <Button variant="light">Light</Button>
                <Button variant="dark">Dark</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Button>Default</Button>
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>`}</code>
                </pre>
              </div>
            </Card>

            <Card title="Tamaños de Botones" description="Diferentes tamaños para adaptarse a tus necesidades">
              <div className="component-demo">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}</code>
                </pre>
              </div>
            </Card>

            <Card title="Botones con Iconos" description="Botones con iconos para mejorar la experiencia visual">
              <div className="component-demo">
                <Button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  <span>Añadir</span>
                </Button>
                <Button variant="success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Guardar</span>
                </Button>
                <Button variant="danger">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                  <span>Eliminar</span>
                </Button>
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Button>
  <svg>...</svg>
  <span>Añadir</span>
</Button>`}</code>
                </pre>
              </div>
            </Card>

            <Card title="Estados de Botones" description="Diferentes estados para botones">
              <div className="component-demo">
                <Button disabled>Deshabilitado</Button>
                <Button loading>Cargando</Button>
                <Button active>Activo</Button>
                <Button outline>Outline</Button>
                <Button rounded>Rounded</Button>
                <Button block>Block Button</Button>
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Button disabled>Deshabilitado</Button>
<Button loading>Cargando</Button>
<Button active>Activo</Button>
<Button outline>Outline</Button>
<Button rounded>Rounded</Button>
<Button block>Block Button</Button>`}</code>
                </pre>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "forms" && (
          <div className="component-grid">
            <Card title="Inputs" description="Campos de texto para formularios">
              <div className="component-demo">
                <Input placeholder="Placeholder" />
                <Input defaultValue="Con valor" /> {/* Cambiado de value a defaultValue *//*}
                <Input disabled placeholder="Deshabilitado" />
                <Input error placeholder="Con error" />
                <Input success placeholder="Con éxito" />
                <Input icon="search" placeholder="Con icono" />
                <Input type="password" placeholder="Contraseña" />
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Input placeholder="Placeholder" />
<Input value="Con valor" />
<Input disabled placeholder="Deshabilitado" />
<Input error placeholder="Con error" />
<Input success placeholder="Con éxito" />
<Input icon="search" placeholder="Con icono" />
<Input type="password" placeholder="Contraseña" />`}</code>
                </pre>
              </div>
            </Card>

            <Card title="Textarea" description="Áreas de texto para formularios">
              <div className="component-demo">
                <Textarea placeholder="Escribe aquí..." rows={4} />
                <Textarea disabled placeholder="Deshabilitado" rows={4} />
                <Textarea error placeholder="Con error" rows={4} />
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Textarea placeholder="Escribe aquí..." rows={4} />
<Textarea disabled placeholder="Deshabilitado" rows={4} />
<Textarea error placeholder="Con error" rows={4} />`}</code>
                </pre>
              </div>
            </Card>

            <Card title="Checkbox y Radio" description="Opciones de selección">
              <div className="component-demo">
                <div className="form-group">
                  <Checkbox id="checkbox1" label="Checkbox 1" />
                  <Checkbox id="checkbox2" label="Checkbox 2" defaultChecked />
                  <Checkbox id="checkbox3" label="Checkbox deshabilitado" disabled />
                </div>
                <div className="form-group">
                  <Radio name="radio" id="radio1" label="Radio 1" />
                  <Radio name="radio" id="radio2" label="Radio 2" defaultChecked />
                  <Radio name="radio" id="radio3" label="Radio deshabilitado" disabled />
                </div>
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Checkbox id="checkbox1" label="Checkbox 1" />
<Checkbox id="checkbox2" label="Checkbox 2" defaultChecked />
<Checkbox id="checkbox3" label="Checkbox deshabilitado" disabled />

<Radio name="radio" id="radio1" label="Radio 1" />
<Radio name="radio" id="radio2" label="Radio 2" defaultChecked />
<Radio name="radio" id="radio3" label="Radio deshabilitado" disabled />`}</code>
                </pre>
              </div>
            </Card>

            <Card title="Select" description="Menús desplegables">
              <div className="component-demo">
                <Select
                  options={[
                    { value: "option1", label: "Opción 1" },
                    { value: "option2", label: "Opción 2" },
                    { value: "option3", label: "Opción 3" },
                  ]}
                  placeholder="Selecciona una opción"
                />
                <Select
                  options={[
                    { value: "option1", label: "Opción 1" },
                    { value: "option2", label: "Opción 2" },
                    { value: "option3", label: "Opción 3" },
                  ]}
                  placeholder="Deshabilitado"
                  disabled
                />
                <Select
                  options={[
                    { value: "option1", label: "Opción 1" },
                    { value: "option2", label: "Opción 2" },
                    { value: "option3", label: "Opción 3" },
                  ]}
                  placeholder="Con error"
                  error
                />
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Select 
  options={[
    { value: "option1", label: "Opción 1" },
    { value: "option2", label: "Opción 2" },
    { value: "option3", label: "Opción 3" }
  ]}
  placeholder="Selecciona una opción"
/>`}</code>
                </pre>
              </div>
            </Card>

            <Card title="Switch" description="Interruptores para activar/desactivar">
              <div className="component-demo">
                <Switch />
                <Switch defaultChecked />
                <Switch disabled />
                <Switch label="Con etiqueta" />
                <Switch label="Activado por defecto" defaultChecked />
                <Switch label="Deshabilitado" disabled />
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Switch />
<Switch defaultChecked />
<Switch disabled />
<Switch label="Con etiqueta" />
<Switch label="Activado por defecto" defaultChecked />
<Switch label="Deshabilitado" disabled />`}</code>
                </pre>
              </div>
            </Card>

            <Card title="Slider" description="Control deslizante para seleccionar valores">
              <div className="component-demo">
                <Slider min={0} max={100} defaultValue={50} />
                <Slider min={0} max={100} defaultValue={[25, 75]} />
                <Slider min={0} max={100} defaultValue={30} disabled />
                <Slider min={0} max={100} defaultValue={40} showValue />
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Slider min={0} max={100} defaultValue={50} />
<Slider min={0} max={100} defaultValue={[25, 75]} />
<Slider min={0} max={100} defaultValue={30} disabled />
<Slider min={0} max={100} defaultValue={40} showValue />`}</code>
                </pre>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "feedback" && (
          <div className="component-grid">
            <Card title="Alertas" description="Mensajes informativos para el usuario">
              <div className="component-demo">
                <Alert variant="primary">Esta es una alerta primaria</Alert>
                <Alert variant="success">Esta es una alerta de éxito</Alert>
                <Alert variant="warning">Esta es una alerta de advertencia</Alert>
                <Alert variant="danger">Esta es una alerta de peligro</Alert>
                <Alert variant="info">Esta es una alerta informativa</Alert>
                <Alert variant="light">Esta es una alerta clara</Alert>
                <Alert variant="dark">Esta es una alerta oscura</Alert>
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Alert variant="primary">Esta es una alerta primaria</Alert>
<Alert variant="success">Esta es una alerta de éxito</Alert>
<Alert variant="warning">Esta es una alerta de advertencia</Alert>
<Alert variant="danger">Esta es una alerta de peligro</Alert>
<Alert variant="info">Esta es una alerta informativa</Alert>`}</code>
                </pre>
              </div>
            </Card>

            <Card title="Badges" description="Etiquetas para mostrar estados o contadores">
              <div className="component-demo">
                <Badge>Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="light">Light</Badge>
                <Badge variant="dark">Dark</Badge>
                <Badge rounded>Rounded</Badge>
                <Badge pill>Pill</Badge>
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>
<Badge rounded>Rounded</Badge>
<Badge pill>Pill</Badge>`}</code>
                </pre>
              </div>
            </Card>

            <Card title="Progress" description="Barras de progreso">
              <div className="component-demo">
                <Progress value={25} />
                <Progress value={50} variant="success" />
                <Progress value={75} variant="warning" />
                <Progress value={100} variant="danger" />
                <Progress value={60} showValue />
                <Progress value={80} height={10} />
                <Progress value={[30, 20, 15]} />
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Progress value={25} />
<Progress value={50} variant="success" />
<Progress value={75} variant="warning" />
<Progress value={100} variant="danger" />
<Progress value={60} showValue />
<Progress value={80} height={10} />
<Progress value={[30, 20, 15]} />`}</code>
                </pre>
              </div>
            </Card>

            <Card title="Spinners" description="Indicadores de carga">
              <div className="component-demo">
                <Spinner />
                <Spinner size="sm" />
                <Spinner size="lg" />
                <Spinner variant="primary" />
                <Spinner variant="secondary" />
                <Spinner variant="success" />
                <Spinner variant="danger" />
                <Spinner variant="warning" />
                <Spinner variant="info" />
                <Spinner type="grow" />
                <Spinner type="dots" />
                <Spinner type="ring" />
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Spinner />
<Spinner size="sm" />
<Spinner size="lg" />
<Spinner variant="primary" />
<Spinner variant="secondary" />
<Spinner type="grow" />
<Spinner type="dots" />
<Spinner type="ring" />`}</code>
                </pre>
              </div>
            </Card>

            <Card title="Tooltips" description="Información adicional al pasar el cursor">
              <div className="component-demo">
                <TooltipProvider>
                  <Tooltip content="Tooltip arriba" position="top">
                    <Button>Hover arriba</Button>
                  </Tooltip>
                  <Tooltip content="Tooltip derecha" position="right">
                    <Button>Hover derecha</Button>
                  </Tooltip>
                  <Tooltip content="Tooltip abajo" position="bottom">
                    <Button>Hover abajo</Button>
                  </Tooltip>
                  <Tooltip content="Tooltip izquierda" position="left">
                    <Button>Hover izquierda</Button>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Tooltip content="Tooltip arriba" position="top">
  <Button>Hover arriba</Button>
</Tooltip>
<Tooltip content="Tooltip derecha" position="right">
  <Button>Hover derecha</Button>
</Tooltip>`}</code>
                </pre>
              </div>
            </Card>

            <Card title="Modal" description="Ventanas emergentes">
              <div className="component-demo">
                <Button onClick={() => setIsModalOpen(true)}>Abrir Modal</Button>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Título del Modal">
                  <p>Este es el contenido del modal. Puedes poner cualquier elemento aquí.</p>
                  <div className="modal-footer">
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                      Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                      Aceptar
                    </Button>
                  </div>
                </Modal>
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Button onClick={() => setIsModalOpen(true)}>
  Abrir Modal
</Button>

<Modal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)}
  title="Título del Modal"
>
  <p>Este es el contenido del modal.</p>
  <div className="modal-footer">
    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
      Cancelar
    </Button>
    <Button variant="primary" onClick={() => setIsModalOpen(false)}>
      Aceptar
    </Button>
  </div>
</Modal>`}</code>
                </pre>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "data" && (
          <div className="component-grid">
            <Card title="Avatars" description="Representaciones visuales de usuarios">
              <div className="component-demo">
                <Avatar src="/placeholder.svg?height=40&width=40" alt="Usuario" />
                <Avatar initials="JD" />
                <Avatar icon="user" />
                <Avatar src="/placeholder.svg?height=40&width=40" alt="Usuario" size="sm" />
                <Avatar src="/placeholder.svg?height=40&width=40" alt="Usuario" size="md" />
                <Avatar src="/placeholder.svg?height=40&width=40" alt="Usuario" size="lg" />
                <Avatar src="/placeholder.svg?height=40&width=40" alt="Usuario" status="online" />
                <Avatar src="/placeholder.svg?height=40&width=40" alt="Usuario" status="busy" />
                <Avatar src="/placeholder.svg?height=40&width=40" alt="Usuario" status="away" />
                <Avatar src="/placeholder.svg?height=40&width=40" alt="Usuario" status="offline" />
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Avatar src="/placeholder.svg" alt="Usuario" />
<Avatar initials="JD" />
<Avatar icon="user" />
<Avatar src="/placeholder.svg" alt="Usuario" size="sm" />
<Avatar src="/placeholder.svg" alt="Usuario" size="md" />
<Avatar src="/placeholder.svg" alt="Usuario" size="lg" />
<Avatar src="/placeholder.svg" alt="Usuario" status="online" />
<Avatar src="/placeholder.svg" alt="Usuario" status="busy" />
<Avatar src="/placeholder.svg" alt="Usuario" status="away" />
<Avatar src="/placeholder.svg" alt="Usuario" status="offline" />`}</code>
                </pre>
              </div>
            </Card>

            <Card title="Cards" description="Contenedores para información">
              <div className="component-demo">
                <div className="card-examples">
                  <Card title="Título de la tarjeta" description="Descripción de la tarjeta">
                    <p>Contenido de la tarjeta</p>
                  </Card>
                  <Card
                    title="Tarjeta con imagen"
                    description="Descripción de la tarjeta"
                    image="/placeholder.svg?height=100&width=300"
                  >
                    <p>Contenido de la tarjeta</p>
                  </Card>
                  <Card
                    title="Tarjeta con acciones"
                    description="Descripción de la tarjeta"
                    actions={
                      <>
                        <Button size="sm">Acción 1</Button>
                        <Button size="sm" variant="secondary">
                          Acción 2
                        </Button>
                      </>
                    }
                  >
                    <p>Contenido de la tarjeta</p>
                  </Card>
                </div>
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Card title="Título de la tarjeta" description="Descripción de la tarjeta">
  <p>Contenido de la tarjeta</p>
</Card>

<Card 
  title="Tarjeta con imagen" 
  description="Descripción de la tarjeta"
  image="/placeholder.svg"
>
  <p>Contenido de la tarjeta</p>
</Card>

<Card 
  title="Tarjeta con acciones" 
  description="Descripción de la tarjeta"
  actions={
    <>
      <Button size="sm">Acción 1</Button>
      <Button size="sm" variant="secondary">Acción 2</Button>
    </>
  }
>
  <p>Contenido de la tarjeta</p>
</Card>`}</code>
                </pre>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "navigation" && (
          <div className="component-grid">
            <Card title="Tabs" description="Pestañas para organizar contenido">
              <div className="component-demo">
                <Tabs
                  tabs={[
                    { id: "tab1", label: "Pestaña 1" },
                    { id: "tab2", label: "Pestaña 2" },
                    { id: "tab3", label: "Pestaña 3" },
                  ]}
                  defaultTab="tab1"
                >
                  <div id="tab1">Contenido de la pestaña 1</div>
                  <div id="tab2">Contenido de la pestaña 2</div>
                  <div id="tab3">Contenido de la pestaña 3</div>
                </Tabs>
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Tabs
  tabs={[
    { id: "tab1", label: "Pestaña 1" },
    { id: "tab2", label: "Pestaña 2" },
    { id: "tab3", label: "Pestaña 3" }
  ]}
  defaultTab="tab1"
>
  <div id="tab1">Contenido de la pestaña 1</div>
  <div id="tab2">Contenido de la pestaña 2</div>
  <div id="tab3">Contenido de la pestaña 3</div>
</Tabs>`}</code>
                </pre>
              </div>
            </Card>

            <Card title="Accordion" description="Paneles colapsables">
              <div className="component-demo">
                <Accordion
                  items={[
                    {
                      id: "item1",
                      title: "Sección 1",
                      content: "Contenido de la sección 1. Puedes poner cualquier elemento aquí.",
                    },
                    {
                      id: "item2",
                      title: "Sección 2",
                      content: "Contenido de la sección 2. Puedes poner cualquier elemento aquí.",
                    },
                    {
                      id: "item3",
                      title: "Sección 3",
                      content: "Contenido de la sección 3. Puedes poner cualquier elemento aquí.",
                    },
                  ]}
                />
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Accordion
  items={[
    {
      id: "item1",
      title: "Sección 1",
      content: "Contenido de la sección 1."
    },
    {
      id: "item2",
      title: "Sección 2",
      content: "Contenido de la sección 2."
    },
    {
      id: "item3",
      title: "Sección 3",
      content: "Contenido de la sección 3."
    }
  ]}
/>`}</code>
                </pre>
              </div>
            </Card>

            <Card title="Dropdown" description="Menús desplegables">
              <div className="component-demo">
                <Dropdown
                  trigger={<Button>Abrir menú</Button>}
                  items={[
                    { label: "Opción 1", onClick: () => console.log("Opción 1") },
                    { label: "Opción 2", onClick: () => console.log("Opción 2") },
                    { label: "Opción 3", onClick: () => console.log("Opción 3") },
                  ]}
                />
              </div>
              <div className="component-code">
                <pre>
                  <code>{`<Dropdown
  trigger={<Button>Abrir menú</Button>}
  items={[
    { label: "Opción 1", onClick: () => console.log("Opción 1") },
    { label: "Opción 2", onClick: () => console.log("Opción 2") },
    { label: "Opción 3", onClick: () => console.log("Opción 3") }
  ]}
/>`}</code>
                </pre>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

*/