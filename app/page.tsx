export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur sm:p-12">
          <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Blog Platform
          </span>

          <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Publish ideas, spark discussion, and grow your audience.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            A modern publishing space for sharing stories, collecting feedback,
            and turning conversations into momentum.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/create-posts"
              className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Create a post
            </a>
            <a
              href="/test"
              className="rounded-full border border-white/15 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
            >
              Explore the app
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Publish
            </p>
            <h2 className="mt-4 text-xl font-semibold text-white">
              Share your work with clarity
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Create posts that feel polished, readable, and built for your
              audience.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Discuss
            </p>
            <h2 className="mt-4 text-xl font-semibold text-white">
              Keep the conversation going
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Invite reactions and comments so your ideas can evolve with your
              community.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Grow
            </p>
            <h2 className="mt-4 text-xl font-semibold text-white">
              Build a loyal readership
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Turn your publishing workflow into a sustainable platform for
              learning and connection.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
