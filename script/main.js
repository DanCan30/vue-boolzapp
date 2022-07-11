const app = new Vue(

    {
        el: "#app",

        data: 
        {    

            activeChat:  0,
            
            newMessage: "",

            searchBar: "",

            dropdownMenu: "hidden",

            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davida',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],

        },

        methods: {
            changeActiveChat: function(chatIndex) {
                this.activeChat = chatIndex
            },

            extractHour: function(stringToSplit) {

                const splittedDate = stringToSplit.split(" ");

                let hour = (splittedDate[1]);

                hour = hour.substring(0, 5);

                return hour;
            },

            sendNewMessage: function(currentIndex) {

                if( this.newMessage === "") {
                    return
                }

                let getCurrentDay = new Date().getDay();
                let getCurrentMonth = new Date().getMonth() + 1;
                let getCurrentYear = new Date().getFullYear();

                let getCurrentHour = new Date().getHours();
                let getCurrentMinutes = new Date().getMinutes();
                let getCurrentSeconds = new Date().getSeconds();

                if (getCurrentHour < 10) {
                    getCurrentHour = "0" + getCurrentHour;
                };

                if (getCurrentMinutes < 10) {
                    getCurrentMinutes = "0" + getCurrentMinutes;
                };

                if (getCurrentSeconds < 10) {
                    getCurrentSeconds = "0" + getCurrentSeconds;
                };

                const currentDate = `${getCurrentDay}/${getCurrentMonth}/${getCurrentYear} ${getCurrentHour}:${getCurrentMinutes}:${getCurrentSeconds}`;

                this.contacts[currentIndex].messages.push({date: currentDate, message: this.newMessage, status: "sent"});

                this.newMessage = "";

                if (this.emptyChat === true) {
                    this.emptyChat = false;
                }
                
                setTimeout(() => this.contacts[currentIndex].messages.push({date: currentDate, message: "Ok!", status: "received"}), 1000);
        
            },

            filterContacts: function() {

                for (let i = 0; i < this.contacts.length; i++) {

                    const lowerCaseInput = this.searchBar.toLowerCase();
                    const lowerCaseContact = this.contacts[i].name.toLowerCase();

                    if(lowerCaseInput === "") {
                        this.contacts[i].visible = true;

                    } else {

                        if (!lowerCaseContact.includes(lowerCaseInput)) {
                            this.contacts[i].visible = false;
                        } else {
                            this.contacts[i].visible = true;
                        };
                    };

                };

            },

            deleteMessage: function(index, array) {

                if (array.length > 0) {
                    array.splice(index, 1);
                };
            },

            isChatEmpty: function() {

                let emptyChat =  false;

                if(this.contacts[this.activeChat].messages.length > 0) {
                    emptyChat = false;
                } else {
                    emptyChat = true;
                };

                return emptyChat;
            },

            getLastElements: function(array, index) {

                if(array.length > 0 ) {

                    const getMessageInfos = this.contacts[index].messages;
    
                    const getLastElement = getMessageInfos[getMessageInfos.length - 1];
    
                    const lastMessage = getLastElement.message;
    
                    const lastReceivedMessageHour = this.extractHour(getLastElement.date);
    
                    
                    return {mostRecentMessage: lastMessage, hour: lastReceivedMessageHour};
                };
            },
        },
    },
);