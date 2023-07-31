import pdfMake from 'pdfmake';

const fontDescriptors = {
  Roboto: {
    normal: 'src/utils/pdfmake/Roboto-Regular.ttf',
  },
};

const printer = new pdfMake(fontDescriptors);

export default printer;
