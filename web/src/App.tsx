import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from './lib/supabase'

type Theme = 'modern' | 'xiuxian'

function App() {
  const [theme, setTheme] = useState<Theme>('modern')
  const [session, setSession] = useState<Session | null>(null)
  const [email, setEmail] = useState('')
  const [authMessage, setAuthMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!isSupabaseConfigured) return

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithEmail = async () => {
    if (!email.trim()) return
    setLoading(true)
    setAuthMessage('')
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin },
    })
    setLoading(false)
    if (error) {
      setAuthMessage(error.message)
    } else {
      setAuthMessage('登录链接已发到邮箱，点链接后回到此页。')
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-lg flex-col px-4 py-8">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-wide text-[var(--pm-muted)]">
            推手
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">pushME</h1>
          <p className="mt-1 text-sm text-[var(--pm-muted)]">
            AI 项目经理 · 阶段 0
          </p>
        </div>
        <div className="flex gap-1 rounded-lg border border-[var(--pm-border)] p-1">
          <button
            type="button"
            onClick={() => setTheme('modern')}
            className={`rounded-md px-3 py-1 text-sm ${
              theme === 'modern'
                ? 'bg-[var(--pm-accent)] text-white'
                : 'text-[var(--pm-muted)]'
            }`}
          >
            现代
          </button>
          <button
            type="button"
            onClick={() => setTheme('xiuxian')}
            className={`rounded-md px-3 py-1 text-sm ${
              theme === 'xiuxian'
                ? 'bg-[var(--pm-accent)] text-white'
                : 'text-[var(--pm-muted)]'
            }`}
          >
            修仙
          </button>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4">
        <section
          className="rounded-xl border border-[var(--pm-border)] bg-[var(--pm-surface)] p-4"
        >
          <h2 className="text-sm font-medium text-[var(--pm-muted)]">环境</h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              Supabase URL：{' '}
              {import.meta.env.VITE_SUPABASE_URL ? '已配置' : '未配置'}
            </li>
            <li>
              Publishable key：{' '}
              {import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ? '已配置' : '未配置'}
            </li>
            <li>PWA：vite-plugin-pwa 已启用</li>
          </ul>
          {!isSupabaseConfigured && (
            <p className="mt-3 text-sm text-amber-600">
              在仓库根目录配置 <code>.env.local</code>，参考{' '}
              <code>.env.example</code>。
            </p>
          )}
        </section>

        {isSupabaseConfigured && (
          <section
            className="rounded-xl border border-[var(--pm-border)] bg-[var(--pm-surface)] p-4"
          >
            <h2 className="text-sm font-medium text-[var(--pm-muted)]">登录</h2>
            {session ? (
              <div className="mt-3 space-y-3">
                <p className="text-sm">已登录：{session.user.email}</p>
                <button
                  type="button"
                  onClick={signOut}
                  className="rounded-lg border border-[var(--pm-border)] px-4 py-2 text-sm"
                >
                  退出
                </button>
              </div>
            ) : (
              <div className="mt-3 space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="邮箱（Magic Link 登录）"
                  className="w-full rounded-lg border border-[var(--pm-border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--pm-accent)]"
                />
                <button
                  type="button"
                  disabled={loading}
                  onClick={signInWithEmail}
                  className="w-full rounded-lg bg-[var(--pm-accent)] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  {loading ? '发送中…' : '发送登录链接'}
                </button>
                {authMessage && (
                  <p className="text-sm text-[var(--pm-muted)]">{authMessage}</p>
                )}
              </div>
            )}
          </section>
        )}

        <section
          className="rounded-xl border border-dashed border-[var(--pm-border)] p-4 text-sm text-[var(--pm-muted)]"
        >
          <p className="font-medium text-[var(--pm-text)]">下一步（阶段 1）</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>在 Supabase SQL Editor 执行 <code>supabase/migrations/</code></li>
            <li>任务 CRUD + 云同步</li>
            <li>导入任务榜.xlsx</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
