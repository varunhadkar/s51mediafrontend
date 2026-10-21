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
    <section aria-labelledby="pipeline" className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2
          id="pipeline"
          className="text-2xl md:text-3xl font-bold mb-10 text-center"
        >
          The complete VFX pipeline, under one roof
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {SERVICES.map(([name, desc]) => (
            <li key={name} className="border border-zinc-800 p-5">
              <h3 className="text-sm font-semibold tracking-[0.2em] uppercase mb-3">
                {name}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
