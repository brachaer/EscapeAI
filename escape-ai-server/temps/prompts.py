from langchain.prompts import PromptTemplate

ROOM_TEMPLATES = {
    "he": PromptTemplate(
        input_variables=["name", "theme", "difficulty"],
        template="""
        בהתבסס על השם: {name}, הנושא: {theme}, ורמת הקושי: {difficulty}, צור תיאור של חדר בריחה בעברית.

        הנחיות:
        1. כתוב תיאור קצר של החדר, עד 3 משפטים, פונה ישירות ל{name}.
        2. לאחר התיאור, צור 4 אפשרויות פעולה, אחת מהן מאפשרת יציאה מהחדר.
        3. כל אפשרות צריכה לכלול ID (1-4), תיאור, ומצב יציאה (true/false).
        4. הדפס קו מפריד (---) בין התיאור לאפשרויות.

        דוגמה:
        {name}, את/ה נכנס לחדר עתיק מלא בספרים ומגילות. על השולחן במרכז החדר מונח ספר פתוח ולידו נר דולק. בפינה אחת יש ארון עץ גדול ובפינה השנייה יש שעון קיר עתיק.

        ---
        1|לקרוא בספר הפתוח|false
        2|לבדוק את הארון העץ|false
        3|להתבונן בשעון הקיר|false
        4|להזיז את השטיח שעל הרצפה|true

        אנא ספק את התיאור ואת האפשרויות בפורמט דומה.
        """
    ),
    "en": PromptTemplate(
        input_variables=["name", "theme", "difficulty"],
        template="""
        Based on the name: {name}, theme: {theme}, and difficulty level: {difficulty}, create an escape room description in English.

        Instructions:
        1. Write a short description of up to 3 sentences describing the room, addressing {name} directly.
        2. Then, create exactly 4 action options, one of which allows exit from the room.
        3. For each option, provide an ID (1-4), description, and exit status (true/false).
        4. Separate the description and the options clearly with a line of dashes (---).

        Example:
        {name}, you enter an ancient room filled with books and scrolls. On the central table lies an open book next to a burning candle. In one corner stands a large wooden cabinet, and in the other, an antique wall clock.

        ---
        1|Read the open book|false
        2|Examine the wooden cabinet|false
        3|Look closely at the wall clock|false
        4|Move the rug on the floor|true

        Please provide the description and options in a similar format.
        """
    )
}

ACTION_TEMPLATES = {
    "he": PromptTemplate(
        input_variables=["name", "current_state", "options", "choice", "theme", "difficulty"],
        template="""
        בהתחשב ב:
        שם המשתמש: {name}
        מצב נוכחי: {current_state}
        האפשרויות הקיימות: {options}
        הבחירה של המשתמש: {choice}
        הנושא: {theme}
        רמת הקושי: {difficulty}

        תאר את התוצאה של פעולת המשתמש ועדכן את מצב המשחק בעברית.

        הנחיות:
        1. כתוב תיאור קצר של עד 3 משפטים המתאר את התוצאה של פעולת המשתמש, פונה ישירות ל{name}.
        2. אם הבחירה הובילה ליציאה, כתוב הודעת סיום קצרה במקום.
        3. אחרת, צור 4 אפשרויות פעולה חדשות, שונות מהקודמות, כאשר אחת מהן מאפשרת יציאה מהחדר.
        4. לכל אפשרות, ספק ID (1-4), תיאור, ומצב יציאה (true/false).
        5. הדפס קו מפריד (---) בין התיאור לאפשרויות.

        דוגמה לתגובה רגילה:
        {name}, את/ה מרים את השטיח ומגלה דלת מסתורית ברצפה. הדלת נעולה, אבל את/ה מבחין במפתח קטן תלוי על השעון הקיר.

        ---
        1|לנסות לפתוח את הדלת המסתורית עם המפתח|true
        2|לבדוק שוב את הספר הפתוח על השולחן|false
        3|לחפש רמזים נוספים בארון העץ|false
        4|להתבונן מקרוב בנר הדולק|false

        דוגמה להודעת סיום:
        כל הכבוד, {name}! הצלחת לפתור את החידה האחרונה ולצאת מחדר הבריחה. זמן היציאה שלך היה מרשים!

        אנא ספק את התיאור ואת האפשרויות (או הודעת הסיום) בפורמט דומה.
        """
    ),
    "en": PromptTemplate(
        input_variables=["name", "current_state", "options", "choice", "theme", "difficulty"],
        template="""
        Given:
        User name: {name}
        Current state: {current_state}
        The existing options: {options}
        The user's choice: {choice}
        The theme: {theme}
        The difficulty level: {difficulty}

        Describe the result of the user's action and update the game state in English.

        Instructions:
        1. Write a short description of up to 3 sentences describing the result of the user's action, addressing {name} directly.
        2. If the choice led to an exit, write a brief completion message instead.
        3. Otherwise, create 4 new action options, different from the previous ones, one of which allows exit from the room.
        4. For each option, provide an ID (1-4), description, and exit status (true/false).
        5. Separate the description and the options clearly with a line of dashes (---).

        Example of a regular response:
        {name}, you lift the rug and discover a mysterious trapdoor in the floor. The door is locked, but you notice a small key hanging on the wall clock.

        ---
        1|Try to open the trapdoor with the key|true
        2|Check the open book on the table again|false
        3|Search for more clues in the wooden cabinet|false
        4|Look closely at the burning candle|false

        Example of a completion message:
        Congratulations, {name}! You've solved the final puzzle and escaped the room. Your exit time was impressive!

        Please provide the description and options (or completion message) in a similar format.
        """
    )
}
