const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((res) => res.json()) // promise of json data
    .then((json) => displayLessons(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      const clickedBtn = document.getElementById(`lesson-btn-${id}`);
      removeActive(); // remove all active classes
      clickedBtn.classList.add("active");
      displayLevelWord(json.data);
    });
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = ``;

  if (words.length === 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full rounded-xl py-10 space-y-3">

        <img class = "mx-auto" src = "./assets/alert-error.png"/>
        <p class="font-bangla text-xl text-gray-600">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bangla font-bold text-3xl">নেক্সট Lesson এ যান</h2>
      </div>
    
    `;

    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-3"
      >
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h2>
        <p class="font-semibold">Meaning / Pronunciation</p>
        <div class="font-bangla text-2xl font-medium">${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায় নি"}</div>
        <div class="flex justify-between items-center">
          <button onclick = "my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    wordContainer.append(card);
  });
};

const displayLessons = (lessons) => {
  //1 get container & empty it
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = ``;

  //2 get into every lesson
  for (let lesson of lessons) {
    //3 create el
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                <button id = 'lesson-btn-${lesson.level_no}' onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
                </button>
    `;
    // 4 append
    levelContainer.append(btnDiv);
  }
};

loadLessons();
