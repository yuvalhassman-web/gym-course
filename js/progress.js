/* שמירת התקדמות בדפדפן (localStorage). אין שרת — הנתונים נשמרים רק במכשיר של המשתמש. */
window.Progress = (function () {
  var KEY = "gymCourse.completed";

  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function write(list) {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) { /* אחסון חסום (למשל גלישה פרטית) — ממשיכים בלי לשמור */ }
  }

  function validIds() {
    return window.COURSE.allLessons.map(function (l) { return l.id; });
  }

  function completed() {
    var ids = validIds();
    return read().filter(function (id) { return ids.indexOf(id) !== -1; });
  }

  function isDone(id) {
    return completed().indexOf(id) !== -1;
  }

  function setDone(id, done) {
    var list = completed().filter(function (x) { return x !== id; });
    if (done) list.push(id);
    write(list);
  }

  function toggle(id) {
    setDone(id, !isDone(id));
    return isDone(id);
  }

  function reset() {
    write([]);
  }

  function stats(lessons) {
    lessons = lessons || window.COURSE.allLessons;
    var done = completed();
    var count = lessons.filter(function (l) { return done.indexOf(l.id) !== -1; }).length;
    var total = lessons.length;
    return { done: count, total: total, percent: total ? Math.round((count / total) * 100) : 0 };
  }

  /* השיעור הבא שלא הושלם (או הראשון אם הכל הושלם) */
  function nextLesson() {
    var done = completed();
    var all = window.COURSE.allLessons;
    for (var i = 0; i < all.length; i++) {
      if (done.indexOf(all[i].id) === -1) return all[i];
    }
    return all[0];
  }

  return { completed: completed, isDone: isDone, setDone: setDone, toggle: toggle, reset: reset, stats: stats, nextLesson: nextLesson };
})();
