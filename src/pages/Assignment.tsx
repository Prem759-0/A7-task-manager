import React, { useEffect, useRef, useState } from "react";
import {
  BrutalContainer,
  ComicHeading,
  BrutalButton,
  SpeechBubble,
  BrutalInput,
  BrutalCode,
  FlowchartContainer,
  FlowchartCard,
  FlowArrow,
  TaskListCard,
} from "../styles/AssignmentStyles.styled";
import { Container } from "@mui/material";

const Assignment: React.FC = () => {
  // 2. Attributes vs Properties
  const attrInputRef = useRef<HTMLInputElement>(null);
  const [attrLog, setAttrLog] = useState<{ attr: string | null; prop: string }>({
    attr: "Hello",
    prop: "Hello",
  });

  const checkAttrVsProp = () => {
    if (attrInputRef.current) {
      setAttrLog({
        attr: attrInputRef.current.getAttribute("value"),
        prop: attrInputRef.current.value,
      });
    }
  };

  // 3. Event Propagation
  const [propLog, setPropLog] = useState<string[]>([]);
  const logEvent = (phase: string, target: string) => {
    setPropLog((prev) => [...prev, `${phase}: ${target}`]);
  };

  const handleGrandparentCapture = () => logEvent("Capturing", "Grandparent");
  const handleParentCapture = () => logEvent("Capturing", "Parent");
  const handleChildCapture = () => logEvent("Capturing", "Child");

  const handleGrandparentBubble = () => logEvent("Bubbling", "Grandparent");
  const handleParentBubble = () => logEvent("Bubbling", "Parent");
  const handleChildBubble = () => {
    logEvent("Bubbling", "Child");
  };

  const clearPropLog = () => setPropLog([]);

  // 4. Event Delegation
  const [delegationLog, setDelegationLog] = useState<string>("");
  const delegationContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = delegationContainerRef.current;
    if (!container) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("task-item")) {
        setDelegationLog(`Clicked: ${target.textContent} (Handled by Parent Container)`);
      }
    };

    container.addEventListener("click", handler);
    return () => container.removeEventListener("click", handler);
  }, []);

  // 5. DOM Manipulation
  const domShowcaseRef = useRef<HTMLDivElement>(null);

  const addBefore = () => {
    const el = document.createElement("div");
    el.textContent = "Added Before!";
    el.className = "dom-added";
    domShowcaseRef.current?.before(el);
  };

  const addAfter = () => {
    const el = document.createElement("div");
    el.textContent = "Added After!";
    el.className = "dom-added";
    domShowcaseRef.current?.after(el);
  };

  const doPrepend = () => {
    const el = document.createElement("div");
    el.textContent = "Prepended!";
    domShowcaseRef.current?.prepend(el);
  };

  const doAppend = () => {
    const el = document.createElement("div");
    el.textContent = "Appended!";
    domShowcaseRef.current?.append(el);
  };

  const doReplace = () => {
    if (domShowcaseRef.current?.firstChild) {
      const el = document.createElement("span");
      el.textContent = "Replaced!";
      (domShowcaseRef.current.firstChild as ChildNode).replaceWith(el);
    }
  };

  const doRemove = () => {
    if (domShowcaseRef.current?.lastChild) {
      (domShowcaseRef.current.lastChild as ChildNode).remove();
    }
  };

  const cleanupDom = () => {
    document.querySelectorAll(".dom-added").forEach((e) => e.remove());
    if (domShowcaseRef.current) domShowcaseRef.current.innerHTML = "<b>Target Element</b>";
  };

  // 6. Document Fragment Demo
  const fragmentContainerRef = useRef<HTMLDivElement>(null);
  const [perfLog, setPerfLog] = useState<string>("");

  const renderWithoutFragment = () => {
    if (!fragmentContainerRef.current) return;
    fragmentContainerRef.current.innerHTML = "";
    const start = performance.now();
    for (let i = 0; i < 100; i++) {
      const el = document.createElement("div");
      el.textContent = `Task ${i}`;
      fragmentContainerRef.current.appendChild(el);
    }
    const end = performance.now();
    setPerfLog(`Without Fragment: ${(end - start).toFixed(2)}ms`);
  };

  const renderWithFragment = () => {
    if (!fragmentContainerRef.current) return;
    fragmentContainerRef.current.innerHTML = "";
    const start = performance.now();
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 100; i++) {
      const el = document.createElement("div");
      el.textContent = `Task ${i}`;
      fragment.appendChild(el);
    }
    fragmentContainerRef.current.appendChild(fragment);
    const end = performance.now();
    setPerfLog(`With Fragment: ${(end - start).toFixed(2)}ms`);
  };

  // 7. DOM Tree Visualizer & 8. DOM Inspector
  const [inspectorData, setInspectorData] = useState<string | null>(null);

  const handleInspectorClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const id = target.getAttribute("data-id");
    const status = target.getAttribute("data-status");
    const category = target.getAttribute("data-category");

    if (id) {
      setInspectorData(`data-id: ${id}\ndata-status: ${status}\ndata-category: ${category}`);
    }
  };

  // 9. Mutation Observer Demo
  const [mutationLogs, setMutationLogs] = useState<string[]>([]);
  const mutationContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    if (!mutationContainerRef.current) return;

    observerRef.current = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          if (mutation.addedNodes.length > 0) {
            setMutationLogs((p) => [...p, "Task Added"]);
          }
          if (mutation.removedNodes.length > 0) {
            setMutationLogs((p) => [...p, "Task Deleted"]);
          }
        } else if (mutation.type === "attributes") {
          setMutationLogs((p) => [...p, `Task Updated (${mutation.attributeName} changed)`]);
        }
      });
    });

    observerRef.current.observe(mutationContainerRef.current, {
      childList: true,
      attributes: true,
      subtree: true,
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const mutateAdd = () => {
    const el = document.createElement("div");
    el.textContent = "New Task";
    el.className = "task-item";
    mutationContainerRef.current?.appendChild(el);
  };

  const mutateUpdate = () => {
    if (mutationContainerRef.current?.lastChild) {
      (mutationContainerRef.current.lastChild as HTMLElement).setAttribute("data-updated", "true");
    }
  };

  const mutateDelete = () => {
    if (mutationContainerRef.current?.lastChild) {
      mutationContainerRef.current.lastChild.remove();
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <BrutalContainer className="bg-yellow">
        <SpeechBubble>ZAP!</SpeechBubble>
        <ComicHeading>DOM Assignment Playground</ComicHeading>
        <p>
          <strong>Warning:</strong> Highly interactive Neo-Brutalist elements ahead!
        </p>
      </BrutalContainer>

      {/* 1. Browser Rendering Pipeline Section */}
      <BrutalContainer className="bg-blue">
        <ComicHeading style={{ fontSize: "1.5rem" }}>1. Browser Rendering Pipeline</ComicHeading>
        <FlowchartContainer>
          <div style={{ display: "flex", gap: "20px" }}>
            <FlowchartCard className="html">HTML</FlowchartCard>
            <FlowchartCard className="css">CSS</FlowchartCard>
          </div>
          <div style={{ display: "flex", gap: "80px" }}>
            <FlowArrow>↓</FlowArrow>
            <FlowArrow>↓</FlowArrow>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <FlowchartCard className="html">Parsing / Tokenization</FlowchartCard>
            <FlowchartCard className="css">Parsing</FlowchartCard>
          </div>
          <div style={{ display: "flex", gap: "80px" }}>
            <FlowArrow>↓</FlowArrow>
            <FlowArrow>↓</FlowArrow>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <FlowchartCard className="dom">DOM Tree</FlowchartCard>
            <span style={{ fontSize: "2rem", fontWeight: "bold", alignSelf: "center" }}>+</span>
            <FlowchartCard className="dom">CSSOM Tree</FlowchartCard>
          </div>
          <FlowArrow>↓</FlowArrow>
          <FlowchartCard className="render">Render Tree</FlowchartCard>
          <FlowArrow>↓</FlowArrow>
          <FlowchartCard className="render">Layout</FlowchartCard>
          <FlowArrow>↓</FlowArrow>
          <FlowchartCard className="render">Paint</FlowchartCard>
        </FlowchartContainer>
      </BrutalContainer>

      {/* 2. Attributes vs Properties Playground */}
      <BrutalContainer className="bg-pink">
        <SpeechBubble>POW!</SpeechBubble>
        <ComicHeading style={{ fontSize: "1.5rem" }}>2. Attributes vs Properties</ComicHeading>
        <p>Change the value and click "Check" to see the difference.</p>
        <BrutalInput ref={attrInputRef} defaultValue="Hello" placeholder="Type here..." />
        <br />
        <BrutalButton className="action" onClick={checkAttrVsProp}>
          Check Values
        </BrutalButton>
        <BrutalCode>
          Attribute Value [input.getAttribute("value")]: {attrLog.attr}
          <br />
          Property Value [input.value]: {attrLog.prop}
        </BrutalCode>
      </BrutalContainer>

      {/* 3. Event Propagation Demo */}
      <BrutalContainer className="bg-green">
        <ComicHeading style={{ fontSize: "1.5rem" }}>3. Event Propagation</ComicHeading>
        <p>Click the child button and watch the console (and logs below)!</p>

        <div
          onClickCapture={handleGrandparentCapture}
          onClick={handleGrandparentBubble}
          style={{ border: "3px solid black", padding: "20px", background: "#fff" }}
        >
          Grandparent
          <div
            onClickCapture={handleParentCapture}
            onClick={handleParentBubble}
            style={{
              border: "3px solid black",
              padding: "20px",
              margin: "10px 0",
              background: "#f8fafc",
            }}
          >
            Parent
            <br />
            <BrutalButton
              className="danger"
              onClickCapture={handleChildCapture}
              onClick={handleChildBubble}
            >
              Child Button
            </BrutalButton>
          </div>
        </div>

        <BrutalButton onClick={clearPropLog}>Clear Logs</BrutalButton>
        <BrutalCode>
          {propLog.length === 0
            ? "Logs will appear here..."
            : propLog.map((log, i) => <div key={i}>{log}</div>)}
        </BrutalCode>
      </BrutalContainer>

      {/* 4. Event Delegation Visualization */}
      <BrutalContainer className="bg-yellow">
        <ComicHeading style={{ fontSize: "1.5rem" }}>4. Event Delegation</ComicHeading>
        <p>One EventListener on the Parent handling all children.</p>
        <div
          ref={delegationContainerRef}
          style={{ padding: "10px", border: "3px solid black", background: "#fff" }}
        >
          <b>Parent Container</b>
          <TaskListCard className="task-item">Task A</TaskListCard>
          <TaskListCard className="task-item">Task B</TaskListCard>
          <TaskListCard className="task-item">Task C</TaskListCard>
        </div>
        <BrutalCode>{delegationLog || "Click a task..."}</BrutalCode>
      </BrutalContainer>

      {/* 5. DOM Manipulation Showcase */}
      <BrutalContainer className="bg-blue">
        <SpeechBubble>BOOM!</SpeechBubble>
        <ComicHeading style={{ fontSize: "1.5rem" }}>5. DOM Manipulation</ComicHeading>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "20px" }}>
          <BrutalButton onClick={addBefore}>before()</BrutalButton>
          <BrutalButton onClick={addAfter}>after()</BrutalButton>
          <BrutalButton onClick={doPrepend}>prepend()</BrutalButton>
          <BrutalButton onClick={doAppend}>append()</BrutalButton>
          <BrutalButton onClick={doReplace}>replaceWith()</BrutalButton>
          <BrutalButton className="danger" onClick={doRemove}>
            remove()
          </BrutalButton>
          <BrutalButton className="warning" onClick={cleanupDom}>
            Reset
          </BrutalButton>
        </div>

        <div style={{ padding: "20px", border: "3px dashed black", textAlign: "center" }}>
          <div
            ref={domShowcaseRef}
            style={{
              border: "3px solid black",
              background: "#fff",
              padding: "10px",
              display: "inline-block",
            }}
          >
            <b>Target Element</b>
          </div>
        </div>
      </BrutalContainer>

      {/* 6. Document Fragment Demo */}
      <BrutalContainer className="bg-pink">
        <ComicHeading style={{ fontSize: "1.5rem" }}>6. Document Fragment</ComicHeading>
        <BrutalButton className="warning" onClick={renderWithoutFragment}>
          Render Without Fragment
        </BrutalButton>
        <BrutalButton className="success" onClick={renderWithFragment}>
          Render With Fragment
        </BrutalButton>
        <BrutalCode>Performance: {perfLog || "Run a test"}</BrutalCode>
        <div
          ref={fragmentContainerRef}
          style={{
            maxHeight: "150px",
            overflowY: "auto",
            border: "3px solid black",
            background: "#fff",
            padding: "5px",
          }}
        ></div>
      </BrutalContainer>

      {/* 7 & 8. DOM Tree Visualizer and Inspector */}
      <BrutalContainer className="bg-green">
        <ComicHeading style={{ fontSize: "1.5rem" }}>7. Tree & 8. Inspector</ComicHeading>
        <p>Click a task below to inspect its data attributes.</p>
        <div style={{ display: "flex", gap: "20px" }}>
          <div
            style={{ flex: 1, border: "3px solid black", background: "#fff", padding: "10px" }}
            onClick={handleInspectorClick}
          >
            <b>BODY</b>
            <div style={{ marginLeft: "20px", borderLeft: "2px solid black", paddingLeft: "10px" }}>
              <b>MAIN</b>
              <div
                style={{ marginLeft: "20px", borderLeft: "2px solid black", paddingLeft: "10px" }}
              >
                <b>TASK LIST</b>
                <TaskListCard data-id="1" data-status="pending" data-category="work">
                  Learn DOM APIs
                </TaskListCard>
                <TaskListCard data-id="2" data-status="done" data-category="personal">
                  Master React
                </TaskListCard>
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <BrutalCode style={{ height: "100%", margin: 0 }}>
              {inspectorData || "Click a task to inspect..."}
            </BrutalCode>
          </div>
        </div>
      </BrutalContainer>

      {/* 9. Mutation Observer Demo */}
      <BrutalContainer className="bg-yellow">
        <SpeechBubble>BAM!</SpeechBubble>
        <ComicHeading style={{ fontSize: "1.5rem" }}>9. Mutation Observer</ComicHeading>
        <BrutalButton onClick={mutateAdd}>Add Node</BrutalButton>
        <BrutalButton onClick={mutateUpdate}>Update Node Attributes</BrutalButton>
        <BrutalButton className="danger" onClick={mutateDelete}>
          Delete Node
        </BrutalButton>

        <div style={{ display: "flex", gap: "20px", marginTop: "15px" }}>
          <div
            ref={mutationContainerRef}
            style={{
              flex: 1,
              border: "3px solid black",
              background: "#fff",
              padding: "10px",
              minHeight: "100px",
            }}
          >
            <div className="task-item">Initial Task</div>
          </div>
          <div style={{ flex: 1 }}>
            <BrutalCode style={{ height: "100%", margin: 0 }}>
              {mutationLogs.length === 0
                ? "Watching for mutations..."
                : mutationLogs.slice(-5).map((log, i) => <div key={i}>{log}</div>)}
            </BrutalCode>
          </div>
        </div>
      </BrutalContainer>
    </Container>
  );
};

export default Assignment;
