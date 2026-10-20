(function () {
  var course = window.COURSE;
  var all = course.allLessons;
  var current = null;

  var $ = function (id) { return document.getElementById(id); };

  /* --- תפריט עליון נייד --- */
  var nav = $("nav");
  $("navToggle").addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    $("navToggle").setAttribute("aria-expanded", open);
  });

  /* --- מגירת שיעורים בנייד --- */
  function openSidebar() { document.body.classList.add("sidebar-open"); }
  function closeSidebar() { document.body.classList.remove("sidebar-open"); }
  $("sidebarOpen").addEventListener("click", openSidebar);
  $("sidebarClose").addEventListener("click", closeSidebar);
  $("overlay").addEventListener("click", closeSidebar);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeSidebar(); });

  /* --- בניית סרגל הצד --- */
  function buildSidebar() {
    var navEl = $("chapterNav");
    navEl.innerHTML = "";
    course.chapters.forEach(function (ch, i) {
      var lessons = all.filter(function (l) { return l.chapterId === ch.id; });
      var section = document.createElement("section");
      section.className = "chapter";
      section.innerHTML =
        '<div class="chapter-head"><h3><small>פרק ' + (i + 1) + "</small><span></span></h3>" +
        '<span class="count" data-chapter="' + ch.id + '"></span></div><ul class="lesson-list"></ul>';
      section.querySelector("h3 span").textContent = ch.title;
      var ul = section.querySelector("ul");

      lessons.forEach(function (l) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "?lesson=" + encodeURIComponent(l.id);
        a.className = "lesson-link" + (l.isTransition ? " transition" : "");
        a.dataset.id = l.id;
        a.innerHTML =
          '<span class="lesson-status"></span>' +
          '<span class="lesson-title"></span>' +
          (l.duration ? '<span class="lesson-duration"></span>' : "");
        a.querySelector(".lesson-title").textContent = l.title;
        if (l.isTransition) {
          var tag = document.createElement("span");
          tag.className = "tag";
          tag.textContent = "מעבר";
          a.querySelector(".lesson-title").appendChild(tag);
        }
        if (l.duration) a.querySelector(".lesson-duration").textContent = l.duration;
        a.addEventListener("click", function (e) {
          e.preventDefault();
          showLesson(l.id, true);
          closeSidebar();
        });
        li.appendChild(a);
        ul.appendChild(li);
      });
      navEl.appendChild(section);
    });
  }

  /* --- עדכון סטטוס והתקדמות --- */
  function setBar(barId, pct) {
    var bar = $(barId);
    bar.setAttribute("aria-valuenow", pct);
    bar.firstElementChild.style.width = pct + "%";
  }

  function refreshProgress() {
    document.querySelectorAll(".lesson-link").forEach(function (a) {
      var l = all.find(function (x) { return x.id === a.dataset.id; });
      var done = Progress.isDone(l.id);
      a.classList.toggle("done", done);
      a.classList.toggle("active", current && l.id === current.id);
      a.querySelector(".lesson-status").textContent = done ? "✓" : l.number;
      if (current && l.id === current.id) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });

    course.chapters.forEach(function (ch) {
      var s = Progress.stats(all.filter(function (l) { return l.chapterId === ch.id; }));
      document.querySelector('[data-chapter="' + ch.id + '"]').textContent = s.done + "/" + s.total;
    });

    var st = Progress.stats();
    $("sbProgressText").textContent = st.done + "/" + st.total + " שיעורים";
    $("sbProgressPct").textContent = st.percent + "%";
    $("mbProgressText").textContent = st.done + "/" + st.total + " הושלמו";
    setBar("sbProgressBar", st.percent);
    setBar("mbProgressBar", st.percent);
    $("courseDone").classList.toggle("show", st.done === st.total);

    var done = Progress.isDone(current.id);
    var btn = $("completeBtn");
    btn.classList.toggle("is-done", done);
    btn.textContent = done ? "הושלם ✓ (ביטול)" : "סימון כהושלם ✓";
  }

  /* --- נגן וידאו --- */
  function renderVideo(l) {
    var frame = $("videoFrame");
    frame.innerHTML = "";
    if (l.youtubeId) {
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(l.youtubeId) + "?rel=0&modestbranding=1";
      iframe.title = l.title;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      frame.appendChild(iframe);
    } else {
      frame.innerHTML =
        '<div class="video-placeholder"><div>' +
        '<div class="play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></div>' +
        "<strong>הסרטון יעלה בקרוב</strong></div></div>";
    }
  }

  /* --- הצגת שיעור --- */
  function showLesson(id, push) {
    var l = all.find(function (x) { return x.id === id; }) || all[0];
    current = l;

    $("lessonCrumb").innerHTML = "<strong>פרק " + l.chapterNumber + "</strong> · <span></span>";
    $("lessonCrumb").querySelector("span").textContent = l.chapterTitle + " · שיעור " + l.number + " מתוך " + all.length;
    $("lessonTitle").textContent = l.title;
    document.title = l.title + " | " + course.title;

    renderVideo(l);

    $("lessonDesc").textContent = l.description || "";
    var notes = l.notes || [];
    var ul = $("lessonNotes");
    ul.innerHTML = "";
    notes.forEach(function (n) {
      var li = document.createElement("li");
      li.textContent = n;
      ul.appendChild(li);
    });
    $("notesSection").style.display = notes.length ? "" : "none";

    var idx = all.indexOf(l);
    $("prevBtn").disabled = idx === 0;
    $("nextBtn").disabled = idx === all.length - 1;

    if (push) {
      history.pushState({ lesson: l.id }, "", "?lesson=" + encodeURIComponent(l.id));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    refreshProgress();
  }

  /* --- כפתורים --- */
  $("completeBtn").addEventListener("click", function () {
    var nowDone = Progress.toggle(current.id);
    refreshProgress();
    // מעבר אוטומטי לשיעור הבא אחרי סימון
    var idx = all.indexOf(current);
    if (nowDone && idx < all.length - 1) {
      setTimeout(function () { showLesson(all[idx + 1].id, true); }, 350);
    }
  });
  $("prevBtn").addEventListener("click", function () {
    var idx = all.indexOf(current);
    if (idx > 0) showLesson(all[idx - 1].id, true);
  });
  $("nextBtn").addEventListener("click", function () {
    var idx = all.indexOf(current);
    if (idx < all.length - 1) showLesson(all[idx + 1].id, true);
  });
  $("resetBtn").addEventListener("click", function () {
    if (confirm("לאפס את כל ההתקדמות בקורס?")) {
      Progress.reset();
      refreshProgress();
    }
  });
  window.addEventListener("popstate", function () {
    showLesson(new URLSearchParams(location.search).get("lesson"), false);
  });

  /* --- התחלה --- */
  buildSidebar();
  var startId = new URLSearchParams(location.search).get("lesson") || Progress.nextLesson().id;
  showLesson(startId, false);
})();
