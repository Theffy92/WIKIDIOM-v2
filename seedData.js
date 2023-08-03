const seedData = [
    {
      language: 'Spanish',
      country: 'Argentina',
      idiom: '¡Bajá un cambio!',
      meaning: 'Modo imperativo de decir a alguien que se relaje.',
      translatedMeaning: 'Imperative way of saying to someone to relax, to chill',
      examples: ['Estás trabajando mucho. ¡Bajá un cambio!.', 'Estás muy agresiva últimamente. ¡Bajá un cambio!.'],
      examplesTranslation: ["You're working too hard. Calm down!",'You are very agressive lately. Calm down!'],
      countryVariations: { English:[
        {
          country: 'USA',
          variation: 'Take it easy!',
          examples: ["You're working really hard. Take it easy and relax.", "You're very aggressive. Take it easy!."]
        },
      ]}
    },
    {
      language: 'Spanish',
      country: 'Argentina',
      idiom: 'Descansar a alguien',
      meaning: 'Burlarse o reírse de alguien.',
      translatedMeaning: 'To mock o laugh at someone.',
      examples: ['No le hagas caso. ¿No te das cuenta que está descansando?'],
      examplesTranslation: ["Don't pay attention to them. Don't you realize they're mocking you?"],
    },
    {
      language: 'Spanish',
      country: 'Argentina',
      idiom: '¡Qué quilombo!',
      meaning: 'Es un lío, barullo o situación complicada.',
      translatedMeaning: 'It is a mess or a complicated situation.',
      examples: ['Él no puedo salir, porque está en medio de un quilombo con sus padres.', '¡Mirá el quilombo que hiciste en tu pieza!'],
      examplesTranslation: ["He couldn't go out because he is in the middle of a complicated situation with his parents.", "Look at the mess you have made in your bedroom!"],
      countryVariations: { English:[
        {
          country: 'USA',
          variation: 'A hot mess!',
          examples: ["He couldn't go out because he is in the middle of a hot mess with his parents."]
        }, 
      ]}
    },
    {
      language: 'Spanish',
      country: 'Argentina',
      idiom: 'Ponerse la gorra',
      meaning: 'Controlar, ponerse serio o en estatus de autoridad.',
      translatedMeaning: 'Getting serious or in a status of authority.',
      examples: ["Los vecinos se quejaron porque el dueño del edificio decidió ponerse la gorra y prohibir las fiestas después de las 10 de la noche."],
      examplesTranslation: ["The neighbors complained because the building owner decided to get strict and banned parties after 10 p.m.",],
    },
    {
      language: 'Spanish',
      country: 'General',
      idiom: 'Tener ganas.',
      meaning: 'Tener el deseo o voluntad de hacer algo.',
      translatedMeaning: 'To be in the mood to do something.',
      examples: ['Yo tengo ganas de mirar una película.'],
      examplesTranslation: ["I am in the mood for watching a movie."],
      countryVariations: { English:[
        {
          country: 'General',
          variation: 'To feel like',
          examples: ["I feel like watching a movie."]
        }, 
      ]}
    },
    {
      language: 'Spanish',
      country: 'General',
      idiom: 'Meter la pata.',
      meaning: 'Intervenir de forma inoportuna o equivocarse.',
      translatedMeaning: 'Intervene opportunely or make a mistake.',
      examples: ['Acabo de meter la pata. Le pregunté a Elena sobre su fiesta y resulta que era una fiesta sorpresa.'],
      examplesTranslation: ["I just messed up. I asked Elena about her party, and it turns out it was a surprise party."],
      countryVariations: { English:[
        {
          country: 'USA',
          variation: 'To screw up',
          examples: ["I just screwed up. I asked Elena about her party, and it turns out it was a surprise party."]
        }, 
      ]},
    },
    {
      language: 'Spanish',
      country: 'General',
      idiom: 'Tirar la toalla',
      meaning: 'Expresión usada como sinónimo de rendirse.',
      translatedMeaning: 'When someone gives up.',
      examples: ['Después de muchos intentos de convencer a mi jefe de implementar mi idea, finalmente tiré la toalla y acepté que no cambiaría de opinión.'],
      examplesTranslation: ["After many attempts to convince my boss to implement my idea, I finally gave up and accepted that he wouldn't change his mind."],
      countryVariations: { English:[
        {
          country: 'England',
          variation: 'To throw in the sponge',
          examples: ["After many attempts to convince my boss to implement my idea, I finally threw in the sponge and accepted that he wouldn't change his mind."],
        },
       {
         country: 'USA',
         variation: 'To throw in the towel',
         examples: ["After many attempts to convince my boss to implement my idea, I finally threw in the towel and accepted that he wouldn't change his mind."]
       },
      ]},
    },
    {
      language: 'Spanish',
      country: 'General',
      idiom: 'Hacer borrón y cuenta nueva',
      meaning: 'Dejar los conflictos en el pasado y continuar como si nada hubiera pasado.',
      translatedMeaning: 'Leave conflicts in the past and continue as if nothing had happened.',
      examples: ['Después de todas las peleas y malentendidos, decidimos hacer borrón y cuenta nueva y empezar de nuevo nuestra amistad.'],
      examplesTranslation: ["After all the fights and misunderstandings, we decided to move forward and start over in our friendship."],
    },
    {
      language: 'Spanish',
      country: 'Mexico',
      idiom: 'Sacarle la sopa',
      meaning: 'Cuando uno quiere descubrir la verdad.',
      translatedMeaning: 'When you want to find out the truth.',
      examples: ['Amiga no te preocupes yo le voy a sacar la sopa y nos vamos a enterar de qué pasó.'],
      examplesTranslation: ["Don't worry, friend, I will get the information out of him, and we'll find out what happened."],
      countryVariations: { English:[
        {
          country: 'England',
          variation: 'To grill someone',
          examples: ["Don't worry, friend, I'll grill him, and we'll find out what happened."]
        },
      ]},
    },
    {
      language: 'Spanish',
      country: 'Mexico',
      idiom: 'Dar el avión',
      meaning: 'No prestar atención o importancia a algo o alguien.',
      translatedMeaning: 'To ignore or to blow someone off.',
      examples: ['Estaba preguntando la dirección a una persona, pero sólo me dio el avión, no me puso atención.'],
      examplesTranslation: ["I was asking for directions from someone, but they completely ignored me, not paying any attention."],
    },
    {
      language: 'Spanish',
      country: 'Mexico',
      idiom: '¡Aguas!',
      meaning: 'Advertencia de peligro inminente.',
      translatedMeaning: 'Imminent danger warning.',
      examples: ['¡Aguas con esa persona, es muy astuta!'],
      examplesTranslation: ["Be careful with that person, they are very cunning!"],
      countryVariations: { English:[
        {
          country: 'USA',
          variation: 'Watch out!',
          examples: ["Watch out with that person, they are very cunning."]
        },
      ]},
    },
    {
      language: 'Spanish',
      country: 'Mexico',
      idiom: 'Hacerla de tos',
      meaning: 'Armar pleito.',
      translatedMeaning: 'Cause a fight.',
      examples: ['Siempre que se reúnen, él la hace de tos y terminan enojados.'],
      examplesTranslation: ["Whenever they gather, he causes trouble, and they end up feeling angry."],
    },
  {
    language: 'Spanish',
    country: 'Spain',
    idiom: '¡Qué majo! ¡Qué maja!',
    meaning: 'Adjetivo para describir a una persona agradable.',
    translatedMeaning: 'Adjective to describe a nice person.',
    examples: ['Lorena se super maja, siempre tiene una sonrisa para los demás.'],
    examplesTranslation: ['Lorena is really nice; she always has a smile for others.'],
    countryVariations: {
      English: [
        {
          country: 'USA',
          variation: 'What a gem!',
          examples: ['Lorena is really nice; she always has a smile for others. What a gem!']
        }
      ],
      Spanish: [
        {
          country: 'Argentina',
          variation: 'Ser copado, ser copada',
          examples: ['Lorena es una copada, siempre tiene una sonrisa para los demás.']
        }
      ]
    }
  },
  {
      language: 'Spanish',
      country: 'Spain',
      idiom: 'Me mola/ Cómo mola.',
      meaning: 'Expresión usada para decir que algo gusta mucho.',
      translatedMeaning: 'Expressing that you like something very much.',
      examples: ['¡Cómo mola tu coche!'],
      examplesTranslation: ["Your car is really cool!"],
      countryVariations: { Spanish:[
        {
          country: 'Argentina',
          variation: 'Me copa',
          examples: ["¡Me copa tu auto!."]
        },]},
    },
    {
      language: 'Spanish',
      country: 'Spain',
      idiom: 'Una pasada',
      meaning: 'Superar, exceder o algo que es alucinante y provoca entusiasmo.',
      translatedMeaning: 'Something that is amazing and provokes enthusiasm.',
      examples: ['Esa jugada que hizo es una pasada. No cabe duda que es el mejor futbolista del equipo.'],
      examplesTranslation: ["That play he made is amazing. There is no doubt he is the best football player on the team."],
    },
    {
      language: 'Spanish',
      country: 'Spain',
      idiom: 'Hacer el gilipollas',
      meaning: 'Hacer tonterías o disparates.',
      translatedMeaning: 'Do nonsense.',
      examples: ['Él tomó mucho alcohol la otra noche y empezó a hacer el gilipollas.'],
      examplesTranslation: ["He drank a lot of alcohol the other night and started behaving foolishly."],
      countryVariations: { English:[
        {
          country: 'USA',
          variation: 'To act like a jackass',
          examples: ["He drank a lot of alcohol the other night and started acting like a jackass."]
        },
       ],
      },
    },
    {
      language: 'English',
      country: 'England',
      idiom: 'Brass monkeys',
      meaning: 'Very cold weather.',
      translatedMeaning: 'Clima muy frío.',
      examples: ["Bundle up! It's so cold outside, it feels like brass monkeys out there."],
      examplesTranslation: ["¡Abrígate bien! Hace mucho frío afuera."],
      countryVariations: {
        English:[{
         country: 'USA',
         variation: "colder than a witch's tit outside",   
         examples:["Bundled up! It's colder than a witch's tit outside"]
         }
        ],
        Spanish:[
        {
          country: 'Argentina',
          variation: 'Un frío de cagarse',
          examples: ["¡Abrígate bien! Hace un frío de cagarse afuera.."]
        },
       ],
      },
    },
    {
      language: 'English',
      country: 'England',
      idiom: 'Knackered',
      meaning: 'Exhausted.',
      translatedMeaning: 'Exhausto',
      examples: ['You might be knackered after a long day at the office.'],
      examplesTranslation: ["Debes estar exhausto después de un largo día en la oficina."],
    },
    {
      language: 'English',
      country: 'England',
      idiom: 'A penny for your thoughts.',
      meaning: 'A way of asking someone to share their thoughts with you.',
      translatedMeaning: 'Una manera de preguntar a alguien que comparta sus pensamientos contigo.',
      examples: ['I noticed Maria was contemplative while gazing at the painting. I smiled and said, A penny for your thoughts.'],
      examplesTranslation: ["Noté que María estaba pensativa mientras miraba el cuadro. Sonreí y le dije: ¿En qué estás pensando?"],
    },
    {
      language: 'English',
      country: 'England',
      idiom: 'Codswallop',
      meaning: 'Nonsense',
      translatedMeaning: 'Sin sentido.',
      examples: ['Codswallop, if you ask me..'],
      examplesTranslation: ["Un sin sentido, si me lo preguntas a mí."],
      countryVariations: { Spanish:[
        {
          country: 'Argentina',
          variation: 'Cualquiera',
          examples: ["Eso es cualquiera, si me lo preguntás a mí."]
        },
       ],
      },
    },
    {
      language: 'English',
      country: 'General',
      idiom: 'Beat around the bush',
      meaning: 'Avoid saying what you mean, usually because it is uncomfortable.',
      translatedMeaning: 'Evite decir lo que quiere decir, generalmente porque es incómodo.',
      examples: ["If you want to ask me, just ask me. Don't beat around the bush."],
      examplesTranslation: ["Si quieres preguntarme, simplemente hazlo. No pierdas el tiempo."],
      countryVariations: { Spanish:[
        {
          country: 'Mexico',
          variation: 'No te andes con rodeos',
          examples: ["Si quieres preguntarme, hazlo. No te andes con rodeos."]
        },
        {
          country: 'Argentina',
          variation: 'No des tantas vueltas',
          examples: ["Si querés preguntarme, hacelo. No des tantas vueltas."]
        },
       ],
      },
    },
    {
      language: 'English',
      country: 'General',
      idiom: 'Speak of the devil',
      meaning: 'The person we were just talking about just showed up!',
      translatedMeaning: 'La persona de la que estábamos hablando acaba de llegar.',
      examples: ['I was just talking about Sarah when she walked into the room. Speak of the devil!'],
      examplesTranslation: ["Estaba hablando de Sarah cuando ella entró a la habitación. Qué coincidencia."],
      countryVariations: { Spanish:[
        {
          country: 'Mexico',
          variation: 'Hablando del rey de Roma',
          examples: ["Estaba hablando de Sarah cuando ella entró a la habitación. Hablando del rey de Roma."]
        },
       ],
      },
    },
    {
      language: 'English',
      country: 'General',
      idiom: 'Barking up the wrong tree',
      meaning: 'To be mistaken, to be looking for solutions in the wrong place.',
      translatedMeaning: 'Estar buscando soluciones en el lugar equivocado.',
      examples: ['The detective was barking up the wrong tree when he accused Tom of stealing the money.'],
      examplesTranslation: ["El detective estaba equivocado cuando acusó a Tom de robar el dinero."],
      countryVariations: { Spanish:[
        {
          country: 'Argentina',
          variation: 'Buscándole el pelo al huevo',
          examples: ["El detective le estaba buscando el pelo al huevo cuando acusó a Tom de robar la plata."]
        },
       ],
      },
    },
    {
      language: 'English',
      country: 'USA',
      idiom: 'Hit the sack',
      meaning: 'Go to sleep.',
      translatedMeaning: 'Irse a dormir.',
      examples: ["I had a long day at work, so I'm going to hit the sack early tonight."],
      examplesTranslation: ["Tuve un largo día de trabajo hoy, así que me iré a dormir temprano esta noche."],
      countryVariations: { Spanish:[
        {
          country: 'Argentina',
          variation: 'irse al sobre.',
          examples: ["Tuve un largo día de trabajo hoy, así que voy a irme al sobre temprano esta noche."]
        },
       ],
      },
    },
    {
      language: 'English',
      country: 'USA',
      idiom: "It's not rocket science",
      meaning: "It's not complicated.",
      translatedMeaning: 'No es complicado.',
      examples: ["Cooking this recipe is straightforward. It's not rocket science; anyone can do it!."],
      examplesTranslation: ["Cocinar esta receta es simple. No es difícil, cualquiera puede hacerlo."],
      countryVariations: { Spanish:[
        {
          country: 'Argentina',
          variation: 'No es mucha ciencia',
          examples: ["Cocinar esta receta es simple. No es mucha ciencia, cualquiera puede hacerlo."]
        },
       ],
      },
    },
    {
      language: 'English',
      country: 'USA',
      idiom: 'Spill the beans',
      meaning: 'To reveal information you were not supposed to share.',
      translatedMeaning: 'Revelar información que se suponía que no debías compartir.',
      examples: ['Hey, I heard you went on a secret trip last weekend. Come on, spill the beans! I want to know all the details.'],
      examplesTranslation: ["He drank a lot of alcohol the other night and started behaving foolishly."],
    },
    {
      language: 'English',
      country: 'USA',
      idiom: 'To go Dutch',
      meaning: 'This is used when everyone pays for their own meal at a restaurant.',
      translatedMeaning: 'Cuando cada uno paga su propia cuenta en un restaurante.',
      examples: ['When my friends and I eat out, we always go Dutch.'],
      examplesTranslation: ["Cuando mis amigos y yo comemos afuera, cada uno paga lo que consumió."],
    },
  
];
  
module.exports = seedData;