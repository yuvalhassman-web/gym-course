/*
 * תוכן הקורס — זה הקובץ היחיד שצריך לערוך כדי לעדכן שיעורים.
 *
 * youtubeId: המזהה של הסרטון מהקישור ביוטיוב.
 *   לדוגמה, בקישור https://youtu.be/dQw4w9WgXcQ המזהה הוא dQw4w9WgXcQ
 *   סרטונים במצב "לא רשום" (Unlisted) עובדים כרגיל.
 *   כל עוד השדה ריק, יוצגה הודעה "הסרטון יעלה בקרוב".
 *
 * isTransition: true לסרטון מעבר קצר (מסומן בתגית "מעבר").
 * id: מזהה ייחודי לשיעור. אל תשנו אותו אחרי העלייה לאוויר, כי ההתקדמות נשמרת לפיו.
 */
window.COURSE = {
  title: "איך להתחיל להתאמן לבד בחדר כושר",
  chapters: [
    {
      id: "ch1",
      title: "פתיח היכרות",
      lessons: [
        {
          id: "intro",
          title: "פתיח היכרות",
          duration: "",
          youtubeId: "spKh2rnFHlo",
          description: "ברוכים הבאים לקורס! בסרטון הזה נכיר, נסביר מה מחכה לכם בקורס ואיך להפיק ממנו את המקסימום.",
          notes: ["צפו בשיעורים לפי הסדר.", "סמנו כל שיעור כהושלם כדי לעקוב אחרי ההתקדמות שלכם."]
        }
      ]
    },
    {
      id: "ch2",
      title: "איך מתניעים?",
      lessons: [
        { id: "start-1", title: "2 שאלות שיעזרו לצאת לדרך", duration: "", youtubeId: "IJsVUdFDTvg", description: "תיאור השיעור יופיע כאן.", notes: [] },
        { id: "start-2", title: "מוטיבציה פנימית מול חיצונית", duration: "", youtubeId: "6JlQz5g5fJc", description: "תיאור השיעור יופיע כאן.", notes: [] },
        { id: "start-3", title: "קובעים את האימון הראשון", duration: "", youtubeId: "-HFmH13hzjg", description: "תיאור השיעור יופיע כאן.", notes: [] }
      ]
    },
    {
      id: "ch3",
      title: "מתחילים - האימון הראשון",
      lessons: [
        { id: "w1-1", title: "הסבר תוך חימום", duration: "", youtubeId: "D8zXHqwgqAA", description: "תיאור השיעור יופיע כאן.", notes: [] },
        { id: "w1-2", title: "הסבר רמת מאמץ", duration: "", youtubeId: "jaYV9m7u1sQ", description: "תיאור השיעור יופיע כאן.", notes: [] },
        { id: "w1-3", title: "נפח אימון ועומס יסף", duration: "", youtubeId: "eJDga_8WIx0", description: "תיאור השיעור יופיע כאן.", notes: [] }
      ]
    },
    {
      id: "ch4",
      title: "התחלת תרגילי יסוד",
      lessons: [
        { id: "basics-1", title: "הסבר לחיצת חזה", duration: "", youtubeId: "loPpYnN5S7I", description: "תיאור השיעור יופיע כאן.", notes: [] },
        { id: "basics-transition", title: "מעבר לפני התרגיל הבא", duration: "", youtubeId: "i-SZw5JG_KQ", isTransition: true, description: "סרטון מעבר קצר.", notes: [] },
        { id: "basics-2", title: "הסבר עליות מתח", duration: "", youtubeId: "_fAGQrkOC1U", description: "תיאור השיעור יופיע כאן.", notes: [] },
        { id: "basics-transition-2", title: "מעבר לפני התרגיל הבא", duration: "", youtubeId: "i-SZw5JG_KQ", isTransition: true, description: "סרטון מעבר קצר.", notes: [] },
        { id: "basics-3", title: "לחיצת כתף", duration: "", youtubeId: "a_hBTyVQ_28", description: "תיאור השיעור יופיע כאן.", notes: [] }
      ]
    },
    {
      id: "ch5",
      title: "האימון השני - המשך תרגילי יסוד",
      lessons: [
        { id: "w2-1", title: "סקווטים", duration: "", youtubeId: "4P3ha_fCmrc", description: "תיאור השיעור יופיע כאן.", notes: [] },
        { id: "w2-transition", title: "מעבר לפני התרגיל הבא", duration: "", youtubeId: "i-SZw5JG_KQ", isTransition: true, description: "סרטון מעבר קצר.", notes: [] },
        { id: "w2-2", title: "הסבר דדליפט", duration: "", youtubeId: "YO3lLC_pliA", description: "תיאור השיעור יופיע כאן.", notes: [] },
        { id: "w2-transition-2", title: "מעבר לפני התרגיל הבא", duration: "", youtubeId: "i-SZw5JG_KQ", isTransition: true, description: "סרטון מעבר קצר.", notes: [] },
        { id: "w2-3", title: "לאנג'ים (תרגיל בונוס)", duration: "", youtubeId: "kbKWKuHOb5s", description: "תיאור השיעור יופיע כאן.", notes: [] }
      ]
    },
    {
      id: "ch6",
      title: "סיכום - מעקב התקדמות",
      lessons: [
        {
          id: "summary",
          title: "מעקב התקדמות",
          duration: "",
          youtubeId: "",
          description: "איך לעקוב אחרי ההתקדמות שלכם ולהמשיך להשתפר גם אחרי הקורס.",
          notes: []
        }
      ]
    }
  ]
};

/* רשימה שטוחה של כל השיעורים עם מספור רציף — לשימוש פנימי */
window.COURSE.allLessons = window.COURSE.chapters.flatMap(function (ch, chIndex) {
  return ch.lessons.map(function (l) {
    return Object.assign({}, l, { chapterId: ch.id, chapterTitle: ch.title, chapterNumber: chIndex + 1 });
  });
});
window.COURSE.allLessons.forEach(function (l, i) { l.number = i + 1; });
