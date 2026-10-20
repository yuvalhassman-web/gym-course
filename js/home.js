/*
 * פרטי יצירת קשר: ערכו כאן.
 * whatsapp: מספר בפורמט בינלאומי בלי + ובלי 0 בהתחלה (לדוגמה 972501234567)
 */
var CONTACT = {
  whatsapp: "972500000000",
  whatsappDisplay: "050-000-0000",
  email: "your@email.com",
  instagram: "your_handle"
};

(function () {
  var course = window.COURSE;

  /* --- תפריט נייד --- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  navToggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") nav.classList.remove("open");
  });

  /* --- נתונים כלליים --- */
  document.getElementById("statChapters").textContent = course.chapters.length;
  document.getElementById("statLessons").textContent = course.allLessons.length;
  document.getElementById("year").textContent = new Date().getFullYear();

  /* --- כרטיסי פרקים --- */
  var grid = document.getElementById("chapterGrid");
  course.chapters.forEach(function (ch, i) {
    var lessons = course.allLessons.filter(function (l) { return l.chapterId === ch.id; });
    var s = Progress.stats(lessons);
    var card = document.createElement("a");
    card.className = "chapter-card";
    card.href = "course.html?lesson=" + encodeURIComponent(lessons[0].id);
    card.innerHTML =
      '<div class="chapter-num">' + String(i + 1).padStart(2, "0") + "</div>" +
      "<h3></h3>" +
      '<div class="chapter-meta"><span>' + lessons.length + (lessons.length === 1 ? " סרטון" : " סרטונים") + "</span>" +
      (s.done ? '<span class="done">' + (s.done === s.total ? "הושלם ✓" : s.done + "/" + s.total + " הושלמו") + "</span>" : "") +
      "</div>";
    card.querySelector("h3").textContent = ch.title;
    grid.appendChild(card);
  });

  /* --- התקדמות --- */
  var st = Progress.stats();
  document.getElementById("progressText").textContent = st.done + " מתוך " + st.total + " שיעורים הושלמו";
  document.getElementById("progressPct").textContent = st.percent + "%";
  var bar = document.getElementById("progressBar");
  bar.setAttribute("aria-valuenow", st.percent);
  bar.firstElementChild.style.width = st.percent + "%";

  var next = Progress.nextLesson();
  var nextUrl = "course.html?lesson=" + encodeURIComponent(next.id);
  var continueBtn = document.getElementById("continueBtn");
  continueBtn.href = nextUrl;
  if (st.done === st.total) {
    continueBtn.textContent = "צפייה חוזרת בקורס";
  } else if (st.done > 0) {
    continueBtn.textContent = "המשך משיעור " + next.number;
    document.getElementById("heroCta").textContent = "המשיכו מאיפה שעצרתם";
    document.getElementById("heroCta").href = nextUrl;
  }

  /* --- יצירת קשר --- */
  var waBase = "https://wa.me/" + CONTACT.whatsapp;
  document.getElementById("linkWhatsapp").href = waBase;
  document.getElementById("txtWhatsapp").textContent = CONTACT.whatsappDisplay;
  document.getElementById("linkEmail").href = "mailto:" + CONTACT.email;
  document.getElementById("txtEmail").textContent = CONTACT.email;
  document.getElementById("linkInstagram").href = "https://instagram.com/" + CONTACT.instagram;
  document.getElementById("txtInstagram").textContent = "@" + CONTACT.instagram;

  var form = document.getElementById("contactForm");
  function buildMessage() {
    var name = form.name.value.trim();
    var goal = form.goal.value;
    var msg = form.message.value.trim();
    return "היי, אני " + (name || "") + "\nפונה בנושא: " + goal + (msg ? "\n\n" + msg : "");
  }
  function checkName() {
    if (!form.name.value.trim()) {
      form.name.focus();
      form.name.setAttribute("aria-invalid", "true");
      return false;
    }
    form.name.removeAttribute("aria-invalid");
    return true;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!checkName()) return;
    window.open(waBase + "?text=" + encodeURIComponent(buildMessage()), "_blank", "noopener");
  });
  document.getElementById("sendEmail").addEventListener("click", function () {
    if (!checkName()) return;
    window.location.href = "mailto:" + CONTACT.email +
      "?subject=" + encodeURIComponent("פנייה מהאתר: " + form.goal.value) +
      "&body=" + encodeURIComponent(buildMessage());
  });
})();
