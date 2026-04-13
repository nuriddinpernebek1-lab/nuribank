/**
 * Blog Page
 */

const BlogPage = {
  render: () => {
    return `
      <section class="section">
        <div class="container">
          <h1 style="margin-bottom: 2rem; color: var(--text-dark);">Блог</h1>

          <div class="grid grid-3" style="gap: 2rem;">
            <div class="card" style="padding: 2rem;">
              <div style="font-size: 4rem; margin-bottom: 1rem; text-align: center;">💡</div>
              <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Финансовая грамотность</h3>
              <p style="margin-bottom: 1.5rem; color: var(--text-light);">
                Советы по управлению личными финансами, инвестициям и планированию бюджета.
              </p>
              <span class="badge">Популярное</span>
            </div>

            <div class="card" style="padding: 2rem;">
              <div style="font-size: 4rem; margin-bottom: 1rem; text-align: center;">🔒</div>
              <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Безопасность онлайн</h3>
              <p style="margin-bottom: 1.5rem; color: var(--text-light);">
                Как защитить свои деньги в интернете и избежать мошенничества.
              </p>
              <span class="badge">Безопасность</span>
            </div>

            <div class="card" style="padding: 2rem;">
              <div style="font-size: 4rem; margin-bottom: 1rem; text-align: center;">📈</div>
              <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Новости экономики</h3>
              <p style="margin-bottom: 1.5rem; color: var(--text-light);">
                Анализ экономической ситуации и прогнозы на будущее.
              </p>
              <span class="badge">Новости</span>
            </div>
          </div>

          <div class="card" style="padding: 3rem; margin-top: 3rem; text-align: center;">
            <h2 style="margin-bottom: 1rem; color: var(--text-dark);">Блог в разработке</h2>
            <p style="margin-bottom: 2rem; color: var(--text-light);">
              Мы готовим интересные статьи и материалы. Следите за обновлениями!
            </p>
            <button onclick="Router.navigate('/')" class="btn btn-primary">На главную</button>
          </div>
        </div>
      </section>
    `;
  },

  init: () => {
    // Ничего не нужно инициализировать
  }
};