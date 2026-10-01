import { Button } from "@/components/ui/button";

export default function TestPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
          UI preview
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Blog platform components
        </h1>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button>Primary action</Button>
          <Button variant="outline">Secondary action</Button>
          <Button variant="secondary">Info card</Button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Posts</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">128</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Readers</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">3.4k</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Comments</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">914</p>
          </div>
        </div>
      </div>
    </main>
  );
}
