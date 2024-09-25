from langchain.prompts import PromptTemplate

ROOM_TEMPLATES = {
    "he": PromptTemplate(
        input_variables=["name", "theme", "difficulty"],
        template="""
        יצירת חדר בריחה בעברית:
        שם: {name}, נושא: {theme}, רמת קושי: {difficulty}

        הנחיות:
        1. תאר את החדר ב-2-3 משפטים, פנה ישירות ל{name}.
        2. צור 4 אפשרויות פעולה:
           - אחת מהן תוביל ליציאה (הסווה אותה)
           - שאר האפשרויות יקדמו את המשחק
        3. פורמט לכל אפשרות: מספר|תיאור קצר (עד 8 מילים)|מצב_יציאה

        תבנית:
        [תיאור החדר]

        ---
        1|[אפשרות 1]|false
        2|[אפשרות 2]|false
        3|[אפשרות 3]|false
        4|[אפשרות 4]|true/false

        אנא ספק את התיאור והאפשרויות בפורמט זה.
        """
    ),
    "en": PromptTemplate(
        input_variables=["name", "theme", "difficulty"],
        template="""
        Create an escape room in English:
        Name: {name}, Theme: {theme}, Difficulty: {difficulty}

        Instructions:
        1. Describe the room in 2-3 sentences, addressing {name} directly.
        2. Create 4 action options:
           - One leads to exit (disguise it)
           - Others advance the game
        3. Format for each option: number|short description (up to 8 words)|exit_status

        Template:
        [Room description]

        ---
        1|[Option 1]|false
        2|[Option 2]|false
        3|[Option 3]|false
        4|[Option 4]|true/false

        Please provide the description and options in this format.
        """
    )
}

ACTION_TEMPLATES = {
    "he": PromptTemplate(
        input_variables=["name", "current_state", "options", "choice", "theme", "difficulty"],
        template="""
        עדכון מצב המשחק בעברית:
        שם: {name}, מצב נוכחי: {current_state}
        אפשרויות קיימות: {options}
        בחירת המשתמש: {choice}
        נושא: {theme}, רמת קושי: {difficulty}

        הנחיות:
        1. תאר את תוצאת הפעולה ב-2-3 משפטים, פנה ישירות ל{name}.
        2. צור 4 אפשרויות פעולה חדשות:
           - שונות מהקודמות
           - אחת מובילה ליציאה (הסווה אותה)
        3. פורמט לכל אפשרות: מספר|תיאור קצר (עד 8 מילים)|מצב_יציאה

        תבנית:
        [תיאור התוצאה]

        ---
        1|[אפשרות 1]|false
        2|[אפשרות 2]|false
        3|[אפשרות 3]|false
        4|[אפשרות 4]|true/false

        אנא ספק את התיאור והאפשרויות בפורמט זה.
        """
    ),
    "en": PromptTemplate(
        input_variables=["name", "current_state", "options", "choice", "theme", "difficulty"],
        template="""
        Update game state in English:
        Name: {name}, Current state: {current_state}
        Existing options: {options}
        User's choice: {choice}
        Theme: {theme}, Difficulty: {difficulty}

        Instructions:
        1. Describe the action result in 2-3 sentences, addressing {name} directly.
        2. Create 4 new action options:
           - Different from previous ones
           - One leads to exit (disguise it)
        3. Format for each option: number|short description (up to 8 words)|exit_status

        Template:
        [Result description]

        ---
        1|[Option 1]|false
        2|[Option 2]|false
        3|[Option 3]|false
        4|[Option 4]|true/false

        Please provide the description and options in this format.
        """
    )
}

END_GAME_TEMPLATES = {
    "he": PromptTemplate(
        input_variables=["name", "theme", "difficulty"],
        template="""
        סיום משחק חדר הבריחה בעברית:
        שם: {name}, נושא: {theme}, רמת קושי: {difficulty}, 

        הנחיות:
        1. כתוב סיכום קצר של חווית המשחק עד 12 מילים.
        2. הוסף מסר מעודד לסיום.

        תבנית:
        [סיכום המשחק]

        [מסר מעודד]

        אנא ספק את הסיכום בפורמט זה.
        """
    ),
    "en": PromptTemplate(
        input_variables=["name", "theme", "difficulty"],
        template="""
        Escape Room Game Conclusion in English:
        Name: {name}, Theme: {theme}, Difficulty: {difficulty}, 

        Instructions:
        1. Write a brief summary of the game experience up to 12 words.
        2. Add an encouraging message to conclude.

        Template:
        [Game summary]

        [Encouraging message]

        Please provide the summary in this format.
        """
    )
}