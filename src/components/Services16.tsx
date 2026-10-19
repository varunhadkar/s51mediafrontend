// Real, readable text for the services page. Edit wording to match how you work.
export const SERVICES = [
  ["Concept Design", "Visual development and look-finding that defines creatures, environments and effects before production starts."],
  ["Previsualisation", "Previz of key sequences to plan camera, action and budget before the shoot."],
  ["Matchmove", "Accurate camera and object tracking so CG sits correctly in live-action plates."],
  ["Roto Animation", "Animation-driven roto for complex moving subjects and digital doubles."],
  ["Rotoscopy", "Clean, precise mattes and cut-outs for compositing, across large shot counts."],
  ["Paint", "Wire and rig removal, clean-up and plate repair to a final-delivery standard."],
  ["Lighting", "Lighting and look-development that integrates CG with the photographed scene."],
  ["Animation", "Character and object animation with believable weight and performance."],
  ["FX", "Simulations including fire, smoke, water, destruction and particles."],
  ["Environments", "Full CG and hybrid environments and set extensions."],
  ["Digital Matte Painting (DMP)", "Painted and projected backgrounds that extend sets and locations."],
  ["Creature Animation", "Creature performance and animation for film, television and games."],
  ["Modelling", "Hard-surface, character and environment asset modelling."],
  ["Rigging", "Production-ready rigs built for animator speed and deformation quality."],
  ["Texturing", "High-detail texturing and surfacing for assets and environments."],
  ["Compositing", "Final shot assembly: integration, grading match and delivery to spec."],
] as const;

export default function Services16() {
  return (
    <section aria-labelledby="pipeline">
      <h2 id="pipeline">The complete VFX pipeline, under one roof</h2>
      <ul>
        {SERVICES.map(([name, desc]) => (
          <li key={name}>
            <h3>{name}</h3>
            <p>{desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
