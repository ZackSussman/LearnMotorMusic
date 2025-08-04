import MotorMusicEditor from 'motormusic-react-component'; // or whatever the package name is
import './App.css';


function TutorialBlock({title, instructionText, defaultCodes} : {title : string, instructionText : string, defaultCodes : string[]}) {
    return (
    <div className="tutorial-block">
      <h2 className="tutorial-title">{title}</h2>
      <div className="tutorial-paragraph" dangerouslySetInnerHTML={{ __html: instructionText }}/>
      {defaultCodes.map((code, idx) => (
        <div key={idx} style={{ marginTop: '12px', marginBottom: '12px' }}>
          <MotorMusicEditor
            height="38px"
            width="600px"
            initialCode={code}
            lineNumbers="off"
          />
        </div>
      ))}
    </div>
  );
}

function App() {
   const tutorialSteps = [
    {
      title: "Welcome to the MotorMusic Tutorial",
      instructionText: "This is the tutorial for <strong>MotorMusic</strong>, a programming language designed to capture musical ideas from the inside out — not just as notes or sounds, but as felt motion, gesture, and inner musical experience. Rather than starting from scales or instruments, <strong>MotorMusic</strong> begins with how music moves us — in the body (space) and in time — and builds upward from there (the building up part is in progress and will come in later versions of the language). This guide will walk you through the fundamental components of the language step by step, showing how to shape musical thought using the core constructs of syllables, tension and release, and nested motion.",
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
  ];

  return (
  <div style={{
    backgroundColor:'linear-gradient(to bottom, #1a1a2e, #16213e)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'auto'
  }}>
    <div style={{
      padding: '60px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {tutorialSteps.map((step, idx) => (
        <TutorialBlock
          key={idx}
          title={step.title}
          instructionText={step.instructionText}
          defaultCodes={step.defaultCodes}
        />
      ))}
    </div>
  </div>
);
}

export default App;