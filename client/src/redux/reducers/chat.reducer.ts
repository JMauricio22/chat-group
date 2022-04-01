import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@models/user.model';
import { Message } from '@models/message.models';
import { Channel } from '@models/channel.model';

interface ChatState {
  id: number;
  loading: boolean;
  name: string;
  description: string;
  messages: Message[];
  users: User[];
  error: string;
}

const initialState: ChatState = {
  id: 30,
  loading: false,
  messages: [
    {
      text: 'Der gleiche Ansatz ist anzuwenden, wenn das IMM-Modell kein Profil für die CVARisikokapitalanforderung gegen die CVA aufgerechnet werden. Diese Einheit muss die Integrität der zur Durchführung von Nachschussforderungen verwendeten Daten prüfen und sicherstellen, dass sie ihre Anforderungen für das antizyklische Kapitalpolster als den gewichteten Durchschnitt der Anforderungen in den Ländern, in denen keine tägliche Preisfeststellung erfolgt sowie Instrumente, für die CVARisikokapitalanforderung gegen die CVA aufgerechnet werden. Dementsprechend ergibt sich der Betrag, der 10% übersteigt, mittels eines entsprechenden Abzugsverfahrens abgezogen werden. Der gleiche Ansatz ist anzuwenden, wenn das IMM-Modell kein Profil für die Berechnung und Durchführung von Nachschussforderungen, die Handhabung von Streitigkeiten über Nachschüsse sowie für die Berechnung und Durchführung von Nachschussforderungen, die Handhabung von Streitigkeiten über Nachschüsse sowie für die spezielle buchhalterische Bewertungsregeln gelten (wie z.B. Banken, die die auf die Mindestanforderung hinausgehen, haben sich tatsächlich als entscheidender Faktor erwiesen – auch wenn keine Kreditblase besteht – über die Mindestanforderungen hinausgehende Polster aufbaut, um sich vor objektiven schwerwiegenden Schocks, die viele Ursachen haben können, zu schützen. In der Bilanz ausgewiesene Verbindlichkeiten im Zusammenhang mit leistungsorientierten Pensionsfonds sind bei der Ermittlung des harten Kernkapitals wird in gesonderten Abschnitten eingegangen. Derartige zum Ausgleich herangezogene Vermögenswerte sollten mit dem Risikogewicht versehen werden, das sie als unmittelbares Eigentum der Bank abgeglichen werden.',
      createdAt: '',
      user: {
        email: 'michael@gmail.com',
        name: 'Michael Jordan',
        bio: '',
        phone: '',
      },
    },
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ex nam agam veri, dicunt efficiantur ad qui, ad legere adversarium sit. Vivendum intellegat et qui, ei denique consequuntur vix. Vivendum intellegat et qui, ei denique consequuntur vix. Dolor labitur cu pro. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Id mundi quando mandamus sit, est vide option accusata et. Vivendum intellegat et qui, ei denique consequuntur vix. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Vivendum intellegat et qui, ei denique consequuntur vix. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Te quo atqui libris, dicta aeque usu an. Dolor labitur cu pro. Ad per diam dicant interesset, lorem iusto sensibus ut sed.',
      createdAt: '',
      user: {
        email: 'roberto@gmail.com',
        name: 'Robert Mortten',
        bio: '',
        phone: '',
      },
    },
  ],
  users: [],
  error: '',
  name: 'Frontend Developers',
  description: '',
};

const messageSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    joimRoom: (state: ChatState, { payload }: PayloadAction<Channel>) => ({
      id: payload.id,
      loading: false,
      name: payload.name,
      description: payload.description,
      messages: payload.messages,
      users: payload.users,
      error: '',
    }),
    addNewUser: (state: ChatState, { payload }: PayloadAction<User>) => {
      state.users.push(payload);
    },
  },
});

export const { joimRoom, addNewUser } = messageSlice.actions;

export default messageSlice.reducer;
