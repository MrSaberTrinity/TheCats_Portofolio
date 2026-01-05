document.addEventListener('DOMContentLoaded', () => {
  const sliderConfigs = [
    { id: 'mobs' },
    { id: 'armor' },
    { id: 'weapons' },
    { id: 'effects' }
  ];

  sliderConfigs.forEach(config => {
    const { id } = config;
    const slider = document.getElementById(`slider-wrapper-${id}`);
    const nextBtn = document.getElementById(`next-${id}`);
    const prevBtn = document.getElementById(`prev-${id}`);

    if (!slider || !nextBtn || !prevBtn) return;

    const cards = Array.from(slider.children);
    let index = 0;

    function updateCards() {
      cards.forEach((card, i) => {
        card.classList.remove('active', 'prev', 'next');
        if (i === index) {
          card.classList.add('active');
        } else if (i === (index - 1 + cards.length) % cards.length) {
          card.classList.add('prev');
        } else if (i === (index + 1) % cards.length) {
          card.classList.add('next');
        }
      });
    }

    updateCards();

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      index = (index + 1) % cards.length;
      updateCards();
    });

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      index = (index - 1 + cards.length) % cards.length;
      updateCards();
    });
  });

  const categoryCards = document.querySelectorAll('.category-card');
  const categoryContents = document.querySelectorAll('.category-content');

  function showCategory(category) {

    categoryCards.forEach(card => card.classList.remove('active'));
    const targetCard = document.querySelector(`.category-card[data-category="${category}"]`);
    if (targetCard) targetCard.classList.add('active');

    categoryContents.forEach(content => content.classList.remove('active'));
    const targetContent = document.querySelector(`.category-content[data-category="${category}"]`);
    if (targetContent) targetContent.classList.add('active');
  }

  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      showCategory(category);
    });
  });

  showCategory('mobs');
});

const modelModal = document.getElementById('modelModal');
const closeModalBtn = document.querySelector('.close');

function openModelModal(modelName, modelDescription, modelImageUrl) {
  document.getElementById('modalModelName').textContent = modelName;
  document.getElementById('modalModelImage').src = modelImageUrl;
  modelModal.style.display = 'block';
}


function closeModelModal() {
  modelModal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn').forEach(btn => {
    if (btn.textContent.trim() === 'VIEW MORE') {
      btn.addEventListener('click', function (e) {
        e.preventDefault();

        const card = this.closest('.card-slider');
        const modelName = card.querySelector('h3').textContent;
        const modelType = card.querySelector('.duration').textContent;
        const fullDescription = card.dataset.description || "";
        const modelImageUrl = card.querySelector('.model-image').src;

        document.getElementById('modalModelType').textContent = modelType;
        document.getElementById('modalModelDescription').textContent =
          fullDescription || '';

        openModelModal(modelName, fullDescription, modelImageUrl);
      });
    }
  });
});

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModelModal);
}

window.addEventListener('click', function (event) {
  if (event.target === modelModal) {
    closeModelModal();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' || event.key === 'Esc') {
    closeModelModal();
  }
});
