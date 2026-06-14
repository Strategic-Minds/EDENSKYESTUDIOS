export type ApprovedMaleModel = {
  index: number;
  name: string;
  age: number;
  archetype: string;
  notes: string;
  textFileId: string;
  portraitFileId: string | null;
  portraitFileName: string | null;
  status: 'approved-profile' | 'portrait-pending';
};

export const approvedMaleRosterBatch = {
  title: 'Eden Skye Studios Male Model Roster Source Assets',
  rootFolderId: '16VvjlND6g3oWRoS-QbilOskC3pXoP9th',
  duplicateRootFolderId: '1moJMMDUYZdo5iBSmLC1U-GZEUQ4GxE9M',
  portraitsFolderId: '1NJizvt0stbY_qNBU2yU6rvlCiKzT4E9t',
  duplicatePortraitsFolderId: '1ljAFybRJR0AHRvLA7qT2ElVcA3YsaUmm',
  profileCardsFolderId: '19MTDvl7fYFxs2Ojx9Bpslc-OWh1uSuMU',
  profileTextFolderId: '1j401R7KyJbVSJNPcDMgpCAXNQGonSFJG',
  duplicateProfileTextFolderId: '1G0swiHsaeGeKV5JA2Jvgi8UXXKwjBAAO',
  readmeFileId: '1iOVUD_Ovx7mMIdq3e4DjdZenAUepFFfA',
  count: 20,
  approvalStatus: 'operator-approved',
  portraitStatus: 'All 20 male profile records are operator-approved and matched to Drive portrait PNGs from folder 1ljAFybRJR0AHRvLA7qT2ElVcA3YsaUmm.'
};

export const approvedMaleModels: ApprovedMaleModel[] = [
  { index: 1, name: 'Adrian Cole', age: 32, archetype: 'The Executive', notes: 'Sharp, sophisticated, perfect for business, luxury, and watch campaigns.', textFileId: '1TquJZojSvYpIVkxi4oJPt_eUe33j3RXH', portraitFileId: '1dW7GdhonB-ECnTMTJ3vEG0lzKGxEDYUk', portraitFileName: '01-adrian-cole-portrait.png', status: 'approved-profile' },
  { index: 2, name: 'Benjamin Reid', age: 29, archetype: 'The Modern Classic', notes: 'Clean-cut, approachable, versatile for lifestyle, apparel, and travel.', textFileId: '1z3a8bM9pjWvdPCjgoG6lefS8LFa7mQVf', portraitFileId: '1eGiVaeSd1kfCGL-3wq0htWGsZvbPjfhi', portraitFileName: '02-benjamin-reid-portrait.png', status: 'approved-profile' },
  { index: 3, name: 'Calvin Thomas', age: 38, archetype: 'The Sophisticate', notes: 'Mature, refined, great for luxury brands, automotive, and fragrance.', textFileId: '192LLs2lFj1AB4U7Tn2CCpiIzVvYyent7', portraitFileId: '1AyXsoqDtT4t6HD6K7c8r3lWguSMkB168', portraitFileName: '03-calvin-thomas-portrait.png', status: 'approved-profile' },
  { index: 4, name: 'Daniel Morgan', age: 27, archetype: 'The Creative', notes: 'Artistic, expressive, perfect for editorial, tech, and lifestyle brands.', textFileId: '1nfaQ1vFIwx23YC_X4anq3j3y7szLDvEH', portraitFileId: '1mRv1xu7psKaX4kjEC3C8DUY5Ic6uxrSp', portraitFileName: '04-daniel-morgan-portrait.png', status: 'approved-profile' },
  { index: 5, name: 'Elliot James', age: 34, archetype: 'The All-American', notes: 'Warm, confident, great for outdoor, sports, and family campaigns.', textFileId: '1cmCMULdp2zfa6bw5eCU4dO0inb7aeg0X', portraitFileId: '15MbehK0-VwZcQPw2_CNYDtwt67jZADgI', portraitFileName: '05-elliot-james-portrait.png', status: 'approved-profile' },
  { index: 6, name: 'Gabriel Hawk', age: 41, archetype: 'The Leading Man', notes: 'Strong, charismatic presence for film, TV, and high-end campaigns.', textFileId: '1fLDXphm0o0Lg-T4gXW1QTf3S7migiLHO', portraitFileId: '1SUj3QTU2XucXoRah8fgzXuc0LKnSKAlR', portraitFileName: '06-gabriel-hawk-portrait.png', status: 'approved-profile' },
  { index: 7, name: 'Henry Blackwell', age: 36, archetype: 'The Thinker', notes: 'Intellectual, refined, ideal for education, technology, and corporate.', textFileId: '1Nr8aRZai3YRlPpoGr9hJhYEoicbyhOY7', portraitFileId: '1wr1eykEnJyweC9npBBuxDXqJEu9IbhaI', portraitFileName: '07-henry-blackwell-portrait.png', status: 'approved-profile' },
  { index: 8, name: 'Isaiah Parker', age: 25, archetype: 'The Rising Star', notes: 'Young, fresh, and versatile for fashion, commercial, and social media.', textFileId: '1cTgTEdvPqVjjXr6kDFG6bIJfYNvacPJg', portraitFileId: '1rDKxBko43XCc6RmKqPzse6C1VMUsdiui', portraitFileName: '08-isaiah-parker-portrait.png', status: 'approved-profile' },
  { index: 9, name: 'Jackson Lane', age: 30, archetype: 'The Adventurer', notes: 'Rugged, outdoorsy, perfect for travel, gear, and activewear.', textFileId: '1luHE4XBGd57y6WQefgA9CqcuvOWRTBRr', portraitFileId: '132SEniXtN6UAomOyux39CPFLlrDOVXdn', portraitFileName: '09-jackson-lane-portrait.png', status: 'approved-profile' },
  { index: 10, name: 'Kevin Miller', age: 45, archetype: 'The Authority', notes: 'Established, trustworthy presence for finance, law, and leadership campaigns.', textFileId: '1C4q49osmnbZzqInG6E06gYASgNZegujk', portraitFileId: '1AzVahyWeMsUUZqU-AyhaclCjOCkPlqEr', portraitFileName: '10-kevin-miller-portrait.png', status: 'approved-profile' },
  { index: 11, name: 'Luca Bianchi', age: 31, archetype: 'The European', notes: 'Italian heritage look, elegant and stylish for luxury and fashion.', textFileId: '1ibXF7HL8aZyLNkx7Wh2dzZoxvHJ4Ggyl', portraitFileId: '1SWAzMHcNRncfUlBlNuPDA3xHAUf0WGgp', portraitFileName: '11-luca-bianchi-portrait.png', status: 'approved-profile' },
  { index: 12, name: 'Matthew Torres', age: 28, archetype: 'The Athlete', notes: 'Lean athletic build, great for fitness, wellness, and athletic brands.', textFileId: '1dkbR7vpwuEwXKBTTdwSuyuoCQ4AqIjqA', portraitFileId: '1MYMOR26ySFSuICwv5FhM1aCC2wqffPbj', portraitFileName: '12-matthew-torres-portrait.png', status: 'approved-profile' },
  { index: 13, name: 'Nathan Cross', age: 39, archetype: 'The Professional', notes: 'Polished, dependable, great for business, healthcare, and corporate.', textFileId: '19D7BB7pwQK-ZPF8sWHDvVZTH5aeQeZoi', portraitFileId: '15V2RLvV3dBYW3tcq_Vt7eM_tK5R6gOKr', portraitFileName: '13-nathan-cross-portrait.png', status: 'approved-profile' },
  { index: 14, name: 'Oliver Grant', age: 33, archetype: 'The Charmer', notes: 'Friendly, confident, perfect for lifestyle, dating apps, and beverages.', textFileId: '1ZR9dNzDojnKa__wUQqAVxjk2cIKiQIu9', portraitFileId: '1iS0Jm7R64PUztG6PGFQZwYTFZ_9w6fIY', portraitFileName: '14-oliver-grant-portrait.png', status: 'approved-profile' },
  { index: 15, name: 'Patrick Wells', age: 48, archetype: 'The Distinguished', notes: 'Silver hair, distinguished look for luxury, wine, watches, and premium brands.', textFileId: '16eJWH4Sn0BNiy88pJSQDCRP5nz1JtMzy', portraitFileId: '1HT-YTQySO3hHLiAr6UXK3uxNstyzXO-6', portraitFileName: '15-patrick-wells-portrait.png', status: 'approved-profile' },
  { index: 16, name: 'Ryan Mitchell', age: 26, archetype: 'The Boy Next Door', notes: 'Relatable, friendly, perfect for lifestyle, home, and tech brands.', textFileId: '1VjRF9pLMv4qUqwADIoGOj2t95WH8FCyM', portraitFileId: '15pJY0FCfYn8PJqXwjTuxLMq0TewyA2fe', portraitFileName: '16-ryan-mitchell-portrait.png', status: 'approved-profile' },
  { index: 17, name: 'Sebastian King', age: 37, archetype: 'The Rebel', notes: 'Edgy, tattooed look for motorcycles, whiskey, and alternative brands.', textFileId: '1iQI78Xyky8_G1fjDRty-qbp6jlyrfTpU', portraitFileId: '1i0TPA4qw1OIejC3NKLtQfJUxR2OThNgJ', portraitFileName: '17-sebastian-king-portrait.png', status: 'approved-profile' },
  { index: 18, name: 'Thomas Ashford', age: 42, archetype: 'The Gentleman', notes: 'Timeless, classic style for luxury, travel, and upscale campaigns.', textFileId: '15YHoaE3Hvx6brbLsRbRE4IQFVST0Sd3O', portraitFileId: '1hNy4NWwAC7LmY0ZyjpcYlYObeO1qdNp6', portraitFileName: '18-thomas-ashford-portrait.png', status: 'approved-profile' },
  { index: 19, name: 'Victor Harris', age: 29, archetype: 'The Model Citizen', notes: 'Clean, versatile, great for a wide range of commercial campaigns.', textFileId: '1kRSa2tIoT-jLgHl6YnDpalkWgtyuzKaE', portraitFileId: '1qaCfnlUyShTsFyxxdr8LR-Gb8YmxDsXm', portraitFileName: '19-victor-harris-portrait.png', status: 'approved-profile' },
  { index: 20, name: 'William Cooper', age: 50, archetype: 'The Icon', notes: 'Mature, iconic look for high-end, legacy brands and premium storytelling.', textFileId: '1Oa6A8eemU-AmJTHLWQftst4Vb_Z_mhcn', portraitFileId: '1sgN51uCXWfS7bMoz_IF-14R70YaTv6za', portraitFileName: '20-william-cooper-portrait.png', status: 'approved-profile' }
];
