import MotorMusicEditor from 'motormusic-react-component'; // or whatever the package name is
import './App.css';
import { useRef, useState, useEffect } from 'react';

function TableOfContents({ tutorialSteps, onItemClick, activeStepIndex }: { 
  tutorialSteps: Array<{title: string}>, 
  onItemClick: (stepIndex: number) => void,
  activeStepIndex: number
}) {
  const sections = [
    { title: "Intro", startIndex: 0 },
    { title: "Atomic Units", startIndex: 1 },
    { title: "Basic Motion", startIndex: 4 },
    { title: "Nested Motion", startIndex: 7 },
    { title: "Pitch", startIndex: 8 },
    { title: "Polyphony", startIndex: 9 },
    { title: "Conclusion", startIndex: 11 }
  ];

  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: '180px', // Reduced from 250px
      height: '100vh',
      backgroundColor: 'rgba(26, 26, 46, 0.95)',
      borderRight: '1px solid #4a5568',
      padding: '15px 15px 30px 15px', // Added bottom padding to prevent cutoff
      overflowY: 'auto',
      zIndex: 10,
      boxSizing: 'border-box', // Ensure padding is included in height calculation
    }}>
      <div style={{
        marginBottom: '15px', // Reduced spacing
        borderBottom: '1px solid #4a5568',
        paddingBottom: '8px',
        textAlign: 'center',
        overflow: 'hidden', // Hide the cropped parts
        height: '40px', // Reduced container height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img 
          src="/MM.png" 
          alt="MotorMusic" 
          style={{
            height: '80px', // Reduced from 120px
            width: 'auto',
            objectFit: 'contain',
            transform: 'scale(1.2)', // Reduced scaling from 1.5
            objectPosition: 'center' // Focus on the center of the image
          }}
        />
      </div>
      
      {sections.map((section, sectionIdx) => (
        <div key={sectionIdx} style={{ marginBottom: '12px' }}> {/* Reduced spacing */}
          <div 
            onClick={() => onItemClick(section.startIndex)}
            style={{
              color: '#2b8db8',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '6px',
              padding: '3px 0',
              borderRadius: '3px',
              backgroundColor: activeStepIndex >= section.startIndex && 
                (sectionIdx === sections.length - 1 || activeStepIndex < sections[sectionIdx + 1].startIndex) 
                ? 'rgba(43, 141, 184, 0.2)' : 'transparent',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(43, 141, 184, 0.1)'}
            onMouseLeave={(e) => {
              const isActive = activeStepIndex >= section.startIndex && 
                (sectionIdx === sections.length - 1 || activeStepIndex < sections[sectionIdx + 1].startIndex);
              e.currentTarget.style.backgroundColor = isActive ? 'rgba(43, 141, 184, 0.2)' : 'transparent';
            }}
          >
            {section.title}
          </div>
          
          {tutorialSteps.slice(
            section.startIndex, 
            sectionIdx < sections.length - 1 ? sections[sectionIdx + 1].startIndex : tutorialSteps.length
          ).map((step, stepIdx) => (
            <div
              key={stepIdx}
              onClick={() => onItemClick(section.startIndex + stepIdx)}
              style={{
                color: '#a0aec0',
                fontSize: '0.75rem',
                cursor: 'pointer',
                padding: '2px 0 2px 12px',
                borderRadius: '3px',
                lineHeight: '1.2',
                backgroundColor: activeStepIndex === section.startIndex + stepIdx 
                  ? 'rgba(160, 174, 192, 0.2)' : 'transparent',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(160, 174, 192, 0.1)'}
              onMouseLeave={(e) => {
                const isActive = activeStepIndex === section.startIndex + stepIdx;
                e.currentTarget.style.backgroundColor = isActive ? 'rgba(160, 174, 192, 0.2)' : 'transparent';
              }}
            >
              {step.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function SectionHeader({title, isFirst = false}: {title: string, isFirst?: boolean}) {
  return (
    <div style={{
      width: '100%',
      textAlign: 'center',
      margin: isFirst ? '0 0 25px 0' : '5px 0 25px 0',
      padding: '15px 0',
      borderTop: '1px solid #4a5568',
      borderBottom: '1px solid #4a5568'
    }}>
      <h1 style={{
        color: '#2b8db8',
        fontSize: '1.5rem',
        margin: 0,
        fontWeight: 'bold',
        letterSpacing: '0.05em'
      }}>{title}</h1>
    </div>
  );
}

function TutorialBlock({title, instructionText, defaultCodes, heights = ["28px"]} : {title : string, instructionText : string, defaultCodes : string[], heights? : string[]}) {
    return (
    <div className="tutorial-block">
      <h2 className="tutorial-title">{title}</h2>
      <div className="tutorial-paragraph" dangerouslySetInnerHTML={{ __html: instructionText }}/>
      {defaultCodes.map((code, idx) => {
        const h = heights[idx] ?? heights[0] ?? "28px";
        return (
          <div key={idx} style={{ marginTop: '12px', marginBottom: '12px' }}>
            <MotorMusicEditor
              height={h}
              width="600px"
              initialCode={code}
              lineNumbers="off"
              disableDSTPMInput={true}
            />
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  
  const scrollToStep = (stepIndex: number) => {
    setActiveStepIndex(stepIndex); // Immediately update the active step
    
    const element = stepRefs.current[stepIndex];
    const container = scrollContainerRef.current;
    
    if (element && container) {
      // Calculate the position with a custom offset from the top
      const elementTop = element.offsetTop;
      const offset = 60; // 60px from the top of the container
      
      container.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      console.log('Scroll event triggered!'); // Debug log
      if (!scrollContainerRef.current) {
        console.log('No scroll container ref'); // Debug log
        return;
      }
      
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      console.log('Container rect:', containerRect.top); // Debug log
      
      // Find which step is currently in view
      for (let i = stepRefs.current.length - 1; i >= 0; i--) {
        const element = stepRefs.current[i];
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const relativeTop = elementRect.top - containerRect.top;
          console.log(`Step ${i} relative position:`, relativeTop); // Debug log
          
          // Check if element is in the top portion of the viewport
          if (relativeTop <= 150) { // Increased threshold for better detection
            console.log('Setting active step to:', i); // Debug log
            setActiveStepIndex(i);
            break;
          }
        }
      }
    };

    // Use a timeout to ensure DOM is ready
    const setupScrollListener = () => {
      console.log('Setting up scroll listener'); // Debug log
      const container = scrollContainerRef.current;
      console.log('Container element:', container); // Debug log
      
      if (container) {
        container.addEventListener('scroll', handleScroll);
        console.log('Scroll listener added'); // Debug log
        handleScroll(); // Call once to set initial state
        return () => {
          console.log('Removing scroll listener'); // Debug log
          container.removeEventListener('scroll', handleScroll);
        };
      } else {
        console.log('No container found for scroll listener'); // Debug log
        return undefined;
      }
    };

    // Try immediately and also with a delay
    const cleanup = setupScrollListener();
    const timeoutId = setTimeout(() => {
      console.log('Trying scroll listener setup again after timeout');
      setupScrollListener();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (cleanup) cleanup();
    };
  }, []);

   const tutorialSteps = [
    {
      title: "Welcome to the MotorMusic Tutorial",
      instructionText: "This is the tutorial for <strong>MotorMusic</strong>, a programming language designed to capture musical ideas from the inside out — not just as notes or sounds, but as felt motion, gesture, and inner musical abstraction. Rather than starting from scales or instruments, <strong>MotorMusic</strong> begins with how music moves us — in the body (space) and in time — and builds upward from there. This guide will walk you through the fundamental components of the language step by step, showing how to shape musical thought through its core constructs.",
      defaultCodes: []
    },
    {
      title: "The Syllable",
      instructionText: "The building block of MotorMusic is the syllable. It is just a written 'word' that represents an <strong>atomic musical unit </strong>. Right now, syllables serve as symbolic placeholders, but in the future, we will develop a system that will give them precise meaning. Only then can they start affecting the sound we generate. Ultimately, they will be used to abstract any specific musical qualities in question.",
      defaultCodes: ["ca", "twaaa", "b", "blegh"]
    },
    {
      title: "Timing",
      instructionText: "We may include a number in front of a syllable to specify its length relative to the fixed unit length. Eventually we will develop a construct to allow for this unit length to be specified and dynamically changed within the language itself. For now, it is an external parameter. ",
      defaultCodes: [".5baa", "0.25te", "10wooooa"]
    },
    {
      title: "Silence",
      instructionText: "In this basic model, we still have the assumption that syllables should correspond to something with sound. Thus, if we want to represent the absence of sound, we can use the underscore character, with the amount of time optionally attatched in the beginning just like with syllables. ",
      defaultCodes: ["_", "4_"]
    },
    {
      title: "Tension and Release Between Syllables (Part 1)",
      instructionText: "The core idea we aim to capture in MotorMusic is the experience of <strong>tension and release</strong>. When we hear a musical phrase, we often feel a kind of pull or motion in our body—like something is building or resolving.<br /><br />To represent this, we introduce the <code>.</code> marker. It tells us that the next syllable is a <strong>point of resolution</strong>. The syllables before it are moving <em>toward</em> that resolution. The syllables after it are moving <em>away</em> from that point.<br /><br />For example, in <code>(a b . c d)</code>, the syllables <code>a</code> and <code>b</code> move toward resolution at <code>c</code>, and <code>d</code> continues the release beyond it.",
      defaultCodes: ["(a b . c d)", "(4_ . 2ayyy)"]
    },
    {
      title: "Tension and Release Between Syllables (Part 2)",
      instructionText: "Sometimes music changes direction. We may start in a state of release, and then feel things begin to build again, pulling toward a new point.<br /><br />MotorMusic uses the <code>^</code> marker to signal this kind of <strong>shift</strong>. It means: the syllables before this point were <em>releasing</em> tension, but now we’re starting to <em>build</em> tension again, toward something else.<br /><br />In <code>(a b ^ c d)</code>, <code>a</code> and <code>b</code> are letting go of earlier tension. But then <code>^</code> signals that <code>c</code> and <code>d</code> are pulling us toward a new resolution that hasn't arrived yet.",
      defaultCodes: ["(a b ^ c d)", "(2hey ^ we)"]
    },

    {
      title: "Combining Tension and Release Markers",
      instructionText: "Once you're comfortable with <code>.</code> and <code>^</code> on their own, we can begin to <strong>combine them within a single musical expression</strong>.<br /><br />Take <code>(a b . c d ^ e f)</code> — here’s how to feel it:<br />• <code>a</code> and <code>b</code> are building toward resolution at <code>c</code><br />• <code>d</code> continues the release<br />• Then <code>^</code> marks a shift, and <code>e</code> and <code>f</code> begin building tension again",
      defaultCodes: ["(a b . c d ^ e f)", "(the small . boy ^ goes back to . sleep)", "(the . small boy ^ goes back to . sleep)"]
    }
    ,

    {
  title: "Nested Tension and Release",
  instructionText: `Sometimes musical motion happens on <em>multiple levels</em> at once.<br /><br />
  Imagine your hand moves with its own gesture of tension and release, but your arm is also in motion, shaping that hand movement. And maybe your whole body is swaying too, all the while being moved by a car, plane, or ship. 
  <br /><br />
  In MotorMusic, we represent this kind of <strong>encapsulated motion</strong> by <strong>nesting</strong> phrases:
  <br /><br />
  • The inner phrase feels like a <em>local motion</em><br />
  • The outer phrase creates a <em>larger gesture</em> that moves through the inner one<br /><br />
  For example:
  <code>((a b . c) d e . f)</code><br />
  • <code>(a b . c)</code> is a <em>self-contained arc</em><br />
  • <code>d e</code> picks up from there and moves toward <code>f</code>, creating a larger wave that includes the inner one<br />
  • Note that although the inner motion resolves at <code> c</code>, the unresolved tension towards <code> f</code> is still felt during the inner resolution at c. <br /> <br />

  This helps us describe not just one level of tension and release, but <em>how one flows through another</em> — like nested waves in the body.`,
  defaultCodes: ["((a b . c) d e . f)", "((mo ^ tor . mu ^ sic) is . cool)"]
}
  ,

  {
    title: "Specifying Pitch",
    instructionText: `MotorMusic will support multiple ways to map written syllables to sound in the future. In this release there are two modes you should be aware of:<br /><br />

1) Default (symbolic) mode<br />
- If you do not include any pitch statement, syllables are treated as symbolic labels only. They do not by themselves determine pitch or frequency — you may write any syllable (for example: <code>ca</code>, <code>twaaa</code>, <code>bla</code>) and it will not change the underlying pitch mapping.<br /><br />

2) Pitch-specified mode (fixed mapping)<br />
- To control pitch directly, place a single <code>PITCH_SPECIFICATION</code> statement at the top of your program. Example:<br />
  <code>PITCH_SPECIFICATION: TwelveTET(440)</code><br />
- When this statement is present, the language interprets syllables as written note names (A–G, optional <code>#</code>/<code>b</code>, optional octave). In other words, syllables must follow the note-name rules described below and will be mapped to frequencies according to the chosen pitch specification.<br /><br />

What this means in practice:<br />
<ul>
  <li>Note names are the letters <code>A</code> through <code>G</code>. You may append <code>#</code> for sharp or <code>b</code> for flat (for example <code>C#</code> or <code>Bb</code>).</li>
  <li>You may add an octave number 0–8 after the note name; if omitted the octave defaults to <strong>4</strong> (so <code>A</code> → <code>A4</code>).</li>
  <li>The <code>PITCH_SPECIFICATION</code> sets the frequency that will be used for the reference note (A4 in TwelveTET). For example <code>TwelveTET(440)</code> makes A4 = 440 Hz.</li>
  <li>When pitch mode is active, arbitrary syllables (like <code>ka</code> or <code>twaaa</code>) are not valid for producing pitch and will cause an error; use the default (symbolic) mode when you want free-form, non-pitched syllables.</li>
</ul>
`,
    defaultCodes: [
      "PITCH_SPECIFICATION: TwelveTET(440)\n(((2F ^ F) . 3G 3F 3Bb) . 3A )",
      "PITCH_SPECIFICATION: TwelveTET(432)\n(((2F ^ F) . 3G 3F 3C5) . 3Bb )"
    ],
    heights: ["56px", "56px"]
  },

  {
    title: "Polyphony (Part 1): Syllable Groups",
    instructionText: `Syllable groups let you execute multiple syllables together as a single simultaneous unit.<br /><br />
      Join syllables with <code>&</code> to indicate they are felt/played at the same time. All syllables in a group must share the same length; place a time tag on the front-most syllable to set the group's duration.<br /><br />
    `,
    defaultCodes: [
      "PITCH_SPECIFICATION: TwelveTET(440)\nC&C5",
      "PITCH_SPECIFICATION: TwelveTET(440)\nEb&Bb&F5",
      "PITCH_SPECIFICATION: TwelveTET(432)\n(3Fb&G&C#5&G5 . 4F&G&C5&E5)",
      "hi&blaaa&shtee"
    ],
    heights: ["56px", "56px", "56px", "28px"]
  },

  {
    title: "Polyphony (Part 2): Containment",
    instructionText: `Containment embeds an entire gesture inside a single syllable. Write the inner gesture with curly braces <code>{ ... }</code> immediately after the containing syllable. The contained gesture unfolds during the duration of the containing syllable. We do not write any number in front of the containing syllable as its time can be inferred by the contained gesture.<br /><br />
    
      Containment can be combined with syllable groups and other nesting to express advanced polyphonic relationships where multiple motions are experienced together but at different hierarchical levels.
    `,
    defaultCodes: [
      "PITCH_SPECIFICATION: TwelveTET(440)\nD3&A3{D E F# . 2C#5 2A }",
      "PITCH_SPECIFICATION: TwelveTET(440)\n(((2F ^ F) . Bb3&D3{3G ^ 3F 3Bb}) . 3A&F3 )",
      "(ka{_ a . b} ga{1.5_ .5a .di} . 2du)"
    ],
    heights: ["56px", "56px", "28px"]
  },

  {
    title: "Next Steps",
    instructionText: "Thank you for making it through the MotorMusic tutorial! Now go to <a href='https://zacksussman.com/MotorMusic/' target='_blank' rel='noopener noreferrer' style='color: #2b8db8; text-decoration: underline;'>The Official Website</a> to try it out yourself and explore what's possible!",
    defaultCodes: [],
    heights: []
  }
  ];

  return (
  <div 
    ref={scrollContainerRef}
    style={{
    backgroundColor:'linear-gradient(to bottom, #1a1a2e, #16213e)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'auto'
  }}>
    <TableOfContents tutorialSteps={tutorialSteps} onItemClick={scrollToStep} activeStepIndex={activeStepIndex} />
    <div style={{
      padding: '60px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '800px',
      margin: '0 auto',
      marginLeft: '200px', // Reduced from 270px to 200px
      position: 'relative',
      zIndex: 2,
    }}>
      {tutorialSteps.map((step, idx) => (
        <div 
          key={idx}
          ref={(el) => { stepRefs.current[idx] = el; }}
        >
          {idx === 0 && <SectionHeader title="Intro" isFirst={true} />}
          {idx === 1 && <SectionHeader title="Atomic Units" />}
          {idx === 4 && <SectionHeader title="Basic Motion" />}
          {idx === 7 && <SectionHeader title="Nested Motion" />}
          {idx === 8 && <SectionHeader title="Pitch" />}
          {idx === 9 && <SectionHeader title="Polyphony" />}
          {idx === 11 && <SectionHeader title="Conclusion" />}
          <TutorialBlock
            title={step.title}
            instructionText={step.instructionText}
            defaultCodes={step.defaultCodes}
            heights={step.heights || ["28px"]}
          />
        </div>
      ))}
    </div>
  </div>
);
}

export default App;