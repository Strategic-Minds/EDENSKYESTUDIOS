export type ApprovedBasicPortrait = {
  index: number;
  name: string;
  fileName: string;
  driveFileId: string;
  dimensions: string;
  status: 'approved' | 'pending-final-review';
};

export const approvedBasicPortraitBatch = {
  title: '2026-06-14 Basic Registry Replacements',
  rootFolderId: '1G3r4I99_c59p3HhZ_EQX-MoPvzWEGK_M',
  basicFolderId: '1bJIJIbwHlYGJRrM4_Y8d8iNI8DQixD7f',
  labeledFolderId: '1KiQ9FMtJw4abWV4iK68i2poWwo3wsqKq',
  manifestFileId: '1eWswskKneQXDJRBxGMkxnBQDEWULMXic',
  qaReportFileId: '1qcybUfZ8h-EiiQzzZ-fCMONhTXfRsr3e',
  contactSheetFileId: '1OirCLXguzctHipnwV6N9EIMMzJSLVV11',
  count: 23,
  qaStandard: 'PASS_PENDING_VISUAL_REVIEW'
};

export const additionalFemalePortraitBatch = {
  title: '2026-06-14 Female Bombshell Basic Source Portraits',
  folderId: '1bJIJIbwHlYGJRrM4_Y8d8iNI8DQixD7f',
  manifestFileId: '1sHzxEDZha_SqE5HGBMe5sl8VOBqK8lPE',
  qaReportFileId: '1FhF936HeT_KfAe95qGqNnLR9CM2K0tKH',
  qaReportJsonFileId: '144kfzL2I6xhstLU1N5OiZXMadzLcyX0y',
  contactSheetFileId: '1zrvChlWjquOVEN_UzK-DX919NN5vCkMj',
  count: 10,
  qaStandard: 'PASS_PENDING_VISUAL_REVIEW'
};

export const approvedBasicPortraits: ApprovedBasicPortrait[] = [
  { index: 1, name: 'Eden Skye', fileName: '01-eden-basic-eden-skye.png', driveFileId: '1ndzEOsotXMhwU_XeSb--4ajZtg0nuZg7', dimensions: '1122x1534', status: 'approved' },
  { index: 2, name: 'Luna Moretti', fileName: '02-eden-basic-luna-moretti.png', driveFileId: '1HVdc-qOhnWC-bKhRiKuy3Xo9-p8zl21t', dimensions: '1122x1534', status: 'approved' },
  { index: 3, name: 'Sienna Cole', fileName: '03-eden-basic-sienna-cole.png', driveFileId: '1ORMIu9ADSA67-AnsCMIvm24Re7y6vZQp', dimensions: '1122x1534', status: 'approved' },
  { index: 4, name: 'Natalia Vega', fileName: '04-eden-basic-natalia-vega.png', driveFileId: '1H8fjCbgeMbopQZFdqs6uiw2WNllVSOZe', dimensions: '1122x1534', status: 'approved' },
  { index: 5, name: 'Zoey Parker', fileName: '05-eden-basic-zoey-parker.png', driveFileId: '164SurABw1ajXm3gx_UmzwLNwNdYVjrh_', dimensions: '1122x1534', status: 'approved' },
  { index: 6, name: 'Aria Reyes', fileName: '06-eden-basic-aria-reyes.png', driveFileId: '1kgRPKtvPmmY0IBuTN772g-x78b39Ub0S', dimensions: '1122x1534', status: 'approved' },
  { index: 7, name: 'Camila Santos', fileName: '07-eden-basic-camila-santos.png', driveFileId: '1zQlNhXUbDjZVmqE6cSNbj7TTQaIm9AZq', dimensions: '1122x1534', status: 'approved' },
  { index: 8, name: 'Hailey James', fileName: '08-eden-basic-hailey-james.png', driveFileId: '14um6d449NbpgAAZQhk5GCLtHoCU7kQ8K', dimensions: '1122x1534', status: 'approved' },
  { index: 9, name: 'Isabella Ruiz', fileName: '09-eden-basic-isabella-ruiz.png', driveFileId: '1bB-c9aybyViOWAkfKi48UMK8HTcz3Mi8', dimensions: '1122x1534', status: 'approved' },
  { index: 10, name: 'Viviana Osa', fileName: '10-eden-basic-viviana-osa.png', driveFileId: '1xqW2D5bHKWVohCABi3cR-XZsT_t1jyVf', dimensions: '1122x1534', status: 'approved' },
  { index: 11, name: 'Kayla Brooks', fileName: '11-eden-basic-kayla-brooks.png', driveFileId: '1_nkrDWfppuv1m-be9nDb6NUp1c8JHeQJ', dimensions: '1122x1534', status: 'approved' },
  { index: 12, name: 'Raven Hart', fileName: '12-eden-basic-raven-hart.png', driveFileId: '1A_nEIyn6GP7-fY43H2cdSYIbO-hpFwkD', dimensions: '1122x1534', status: 'approved' },
  { index: 13, name: 'Alexa Monroe', fileName: '13-eden-basic-alexa-monroe.png', driveFileId: '1k1dLrK9BrRvFWlsykAKvkxsJDpLnY7LO', dimensions: '1122x1534', status: 'approved' },
  { index: 14, name: 'Serena Vale', fileName: '01-eden-basic-female-serena-vale.png', driveFileId: '1RlQuVZxSesO4I-X-qUJvJzjLdEDzTiJ3', dimensions: '1122x1534', status: 'pending-final-review' },
  { index: 15, name: 'Ruby Monroe', fileName: '02-eden-basic-female-ruby-monroe.png', driveFileId: '1JlM0wfbyN_QDOCh5S4UgLfObQ2gSWKh7', dimensions: '1122x1534', status: 'pending-final-review' },
  { index: 16, name: 'Brooke Harlow', fileName: '03-eden-basic-female-brooke-harlow.png', driveFileId: '1JFz9TZ0PyVPnY-yON3A_KOInZhJpleif', dimensions: '1122x1534', status: 'pending-final-review' },
  { index: 17, name: 'Claire Sterling', fileName: '04-eden-basic-female-claire-sterling.png', driveFileId: '1TJvi_Odjb-e6PTlTbCDopfaXjUtpiV8i', dimensions: '1122x1534', status: 'pending-final-review' },
  { index: 18, name: 'Naomi Banks', fileName: '05-eden-basic-female-naomi-banks.png', driveFileId: '1IJGWOTnQFym4a0nMU9DBSDxHYOYSXTRQ', dimensions: '1122x1534', status: 'pending-final-review' },
  { index: 19, name: 'Imani Cross', fileName: '06-eden-basic-female-imani-cross.png', driveFileId: '1plSBRy30Du6Y-y-d0J7P5P6omnjmEx68', dimensions: '1122x1534', status: 'pending-final-review' },
  { index: 20, name: 'Violet Reece', fileName: '07-eden-basic-female-violet-reece.png', driveFileId: '127xMeJFz8ucy9YI4fTp_9TpUgu2t5690', dimensions: '1122x1534', status: 'pending-final-review' },
  { index: 21, name: 'Lila Santos', fileName: '08-eden-basic-female-lila-santos.png', driveFileId: '1l1Iov1jHZdav8Bxy-HtT_8v29Wlprn2Z', dimensions: '1122x1534', status: 'pending-final-review' },
  { index: 22, name: 'Sasha Lane', fileName: '09-eden-basic-female-sasha-lane.png', driveFileId: '1v47ookTkib_ERFtqXmpsE3CbPAaea9Pk', dimensions: '1122x1534', status: 'pending-final-review' },
  { index: 23, name: 'Mara Quinn', fileName: '10-eden-basic-female-mara-quinn.png', driveFileId: '12-vtwBYjKoDogehpL15FyltD7HTPHPP7', dimensions: '1122x1534', status: 'pending-final-review' }
];

export function driveThumbnailUrl(fileId: string) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
}
