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

          <p className="mt-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/5 px-3 py-1 text-sm text-cyan-200">
            Built for creators who want thoughtful feedback and steady growth.
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

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-5">
            <p className="text-3xl font-bold text-white">24/7</p>
            <p className="mt-2 text-sm text-slate-300">Publishing workflow</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-5">
            <p className="text-3xl font-bold text-white">1k+</p>
            <p className="mt-2 text-sm text-slate-300">
              community interactions
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-5">
            <p className="text-3xl font-bold text-white">3x</p>
            <p className="mt-2 text-sm text-slate-300">more engagement</p>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white">
              Turn a single idea into a content engine.
            </h2>
            <ul className="mt-6 space-y-4 text-slate-300">
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                Draft in minutes with a focused writing experience.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                Share updates with a clear category and audience-friendly format.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                Keep readers engaged through comments and discussion.
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-cyan-400/30 bg-cyan-500/5 p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Ready to start?
              </p>
              <h3 className="mt-4 text-2xl font-bold text-white">
                Build your next post in minutes.
              </h3>
            </div>
            <a
              href="/create-posts"
              className="mt-8 inline-flex rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Start publishing
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
