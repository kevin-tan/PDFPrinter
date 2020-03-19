/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NativeModules } from 'react-native';
import Pdf from 'react-native-pdf';

const { PDFPrinterModule } = NativeModules;


let RNFS = require('react-native-fs');
let rootPath = RNFS.ExternalDirectoryPath + "/";

export default class App extends React.Component {

  page0TextData = [];

  constructor() {
    super();
    this.generatePage0TextData();
    this.fakeData();
    this.state = {
      visible: false,
      pdfPath: ""
    };
  }

  generatePage0TextData() {
    let mappedValues = COORDINATES["0"];
    for (const [key, values] of Object.entries(mappedValues)) {
      let innerMap = {
        value: "Kappa",
        x: values.x,
        y: 792 - values.y,
        fontSize: values.size,
        color: "#000000"
      };

      if (values.radioButton) {
        innerMap.radioButton = true;
      }

      this.page0TextData.push(innerMap);
    }
  }

  generateDataForPage(image, textData) {
      return {
        backgroundImagePath: image,
        textArray: textData
      };
  }

  fakeData() {
    this._pages = [];

    this._pages.push(this.generateDataForPage('NewPage0.png', this.page0TextData));
    this._pages.push(this.generateDataForPage('NewPage1.png', []));
    this._pages.push(this.generateDataForPage('NewPage2.png', []));
    this._pages.push(this.generateDataForPage('NewPage3.png', []));
    this._pages.push(this.generateDataForPage('NewPage4.png', []));
    this._pages.push(this.generateDataForPage('NewPage5.png', []));
    this._pages.push(this.generateDataForPage('NewPage6.png', []));
  }

  render() {
      return (
        <View style={{flex:1}}>
          <Button 
          title = {"Print"}
          onPress={() => {
            PDFPrinterModule.printDocument(this._pages, "TestDocument", (done) => {
              console.log("finito == " + done);
            });
          }} />
          <Button 
          title = {"View"}
          onPress={() => {
            PDFPrinterModule.createPDFDocument(this._pages, rootPath + 'test/Test.pdf', (done, path) => {
              console.log("finito == " + done);
              console.log("finito == " + path);
              this.setState({visible: done});
              this.setState({pdfPath: path});
            });
          }} />
          
          <View style={{borderColor: 'yellow', borderWidth: 3}}>
            {this.state.visible && <Pdf source={{uri: 'file://' + this.state.pdfPath, cache: true}} style={{flex: 1}} onError={(error) => {console.log(error);}}/>}
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

const DEFAULT_FONT_SIZE = 11;

const COORDINATES  = {
  0: {
    surName: { x: 42, y: 632, size: DEFAULT_FONT_SIZE},
    givenName: { x: 42, y: 602, size: DEFAULT_FONT_SIZE},
    formerSurname: { x: 42, y: 572, size: DEFAULT_FONT_SIZE},
    motherName: { x: 42, y: 541, size: DEFAULT_FONT_SIZE},
    birthCity: { x: 42, y: 513, size: DEFAULT_FONT_SIZE},
    birthCountry: { x: 239, y: 513, size: DEFAULT_FONT_SIZE},
    birthProvince: { x: 478, y: 513, size: DEFAULT_FONT_SIZE},
    // birthYear: { x: 51, y: 477, size: DEFAULT_FONT_SIZE},
    // birthMonth: { x: 94, y: 477, size: DEFAULT_FONT_SIZE},
    // birthDay: { x: 123, y: 477, size: DEFAULT_FONT_SIZE},
    genderFemale: { x: 152.5, y: 482, size: 4, radioButton: true},
    genderMale: { x: 213.5, y: 482, size: 4, radioButton: true},
    genderOther: { x: 269.5, y: 482, size: 4, radioButton: true},
    eyeColor: { x: 373, y: 479, size: DEFAULT_FONT_SIZE},
    height: { x: 497, y: 479, size: DEFAULT_FONT_SIZE},
    addressNumber: { x: 42, y: 452, size: DEFAULT_FONT_SIZE},
    addressStreet: { x: 80, y: 452, size: DEFAULT_FONT_SIZE},
    addressApartment: { x: 245, y: 452, size: DEFAULT_FONT_SIZE},
    addressCity: { x: 286, y: 452, size: DEFAULT_FONT_SIZE},
    addressProvince: { x: 448, y: 452, size: DEFAULT_FONT_SIZE},
    addressZip: { x: 521, y: 452, size: DEFAULT_FONT_SIZE},
    mailingNumber: { x: 42, y: 421, size: DEFAULT_FONT_SIZE},
    mailingStreet: { x: 80, y: 421, size: DEFAULT_FONT_SIZE},
    mailingApartment: { x: 245, y: 421, size: DEFAULT_FONT_SIZE},
    mailingCity: { x: 286, y: 421, size: DEFAULT_FONT_SIZE},
    mailingProvince: { x: 448, y: 421, size: DEFAULT_FONT_SIZE},
    mailingZip: { x: 521, y: 421, size: DEFAULT_FONT_SIZE},
    telephoneDaytime: { x: 42, y: 390, size: DEFAULT_FONT_SIZE},
    telephoneOther: { x: 203, y: 390, size: DEFAULT_FONT_SIZE},
    personalEmail: { x: 365, y: 390, size: DEFAULT_FONT_SIZE},
    guarantorSurname: { x: 42, y: 236, size: DEFAULT_FONT_SIZE},
    guarantorFirstName: { x: 311, y: 236, size: DEFAULT_FONT_SIZE},
    guarantorPassport: { x: 168, y: 206, size: DEFAULT_FONT_SIZE},
    guarantorBirthYear: { x: 50, y: 206, size: DEFAULT_FONT_SIZE},
    guarantorBirthMonth: { x: 98, y: 206, size: DEFAULT_FONT_SIZE},
    guarantorBirthDay: { x: 137, y: 206, size: DEFAULT_FONT_SIZE},
    guarantorIssueYear: { x: 334, y: 206, size: DEFAULT_FONT_SIZE},
    guarantorIssueMonth: { x: 382, y: 206, size: DEFAULT_FONT_SIZE},
    guarantorIssueDay: { x: 421, y: 206, size: DEFAULT_FONT_SIZE},
    guarantorExpiryYear: { x: 462, y: 206, size: DEFAULT_FONT_SIZE},
    guarantorExpiryMonth: { x: 510, y: 206, size: DEFAULT_FONT_SIZE},
    guarantorExpiryDay: { x: 549, y: 206, size: DEFAULT_FONT_SIZE},
    guarantorRelationship: { x: 42, y: 181, size: DEFAULT_FONT_SIZE},
    guarantorTelephoneDaytime: { x: 311, y: 181, size: DEFAULT_FONT_SIZE},
    guarantorTelephoneOther: { x: 446, y: 181, size: DEFAULT_FONT_SIZE},
    guarantorAddressNumber: { x: 42, y: 156, size: DEFAULT_FONT_SIZE},
    guarantorAddressStreet: { x: 76, y: 156, size: DEFAULT_FONT_SIZE},
    guarantorAddressApartment: { x: 245, y: 156, size: DEFAULT_FONT_SIZE},
    guarantorAddressCity: { x: 295, y: 156, size: DEFAULT_FONT_SIZE},
    guarantorAddressProvince: { x: 438, y: 156, size: DEFAULT_FONT_SIZE},
    guarantorAddressZip: { x: 524, y: 156, size: DEFAULT_FONT_SIZE},
    knownGuarantorYears: { x: 320, y: 91, size: DEFAULT_FONT_SIZE},
    guarantorSignedYear: { x: 365, y: 72, size: 9},
    guarantorSignedMonth: { x: 402, y: 72, size: 9},
    guarantorSignedDay: { x: 426, y: 72, size: 9},
    guarantorSignedCity: { x: 446, y: 81, size: 9},
    guarantorSignedProvince: { x: 530, y: 81, size: 9},
  },
  2: {
    addInfoSameAddr: { x: 200, y: 673, size: 65},
    addInfoDiffAddr: { x: 200, y: 661, size: 65},
    addInfoAddr1: { x: 52, y: 629, size: 9},
    addInfoAddrFromYear1: { x: 395, y: 629, size: DEFAULT_FONT_SIZE},
    addInfoAddrFromMonth1: { x: 449, y: 629, size: DEFAULT_FONT_SIZE},
    addInfoAddrToYear1: { x: 497, y: 629, size: DEFAULT_FONT_SIZE},
    addInfoAddrToMonth1: { x: 551, y: 629, size: DEFAULT_FONT_SIZE},
    addInfoAddr2: { x: 52, y: 601, size: 9},
    addInfoAddrFromYear2: { x: 395, y: 601, size: DEFAULT_FONT_SIZE},
    addInfoAddrFromMonth2: { x: 449, y: 601, size: DEFAULT_FONT_SIZE},
    addInfoAddrToYear2: { x: 497, y: 601, size: DEFAULT_FONT_SIZE},
    addInfoAddrToMonth2: { x: 551, y: 601, size: DEFAULT_FONT_SIZE},
    addInfoEmployed: { x: 293, y: 587, size: 10},
    addInfoSchooled: { x: 293, y: 575, size: 10},
    addInfoOther: { x: 293, y: 563, size: 10},
    addInfoOcc1: { x: 39, y: 519, size: 9},
    addInfoOccAddr1Line1: { x: 158, y: 530, size: 7},
    addInfoOccAddr1Line2: { x: 158, y: 521, size: 7},
    addInfoOccAddr1Line3: { x: 158, y: 512, size: 7},
    addInfoOccTel1: { x: 277, y: 519, size: 9},
    addInfoOccField1: { x: 380, y: 519, size: 9},
    addInfoOccFromDate1: { x: 490, y: 519, size: 9},
    addInfoOccToDate1: { x: 538, y: 519, size: 9},
    addInfoOcc2: { x: 39, y: 490, size: 9},
    addInfoOccAddr2Line1: { x: 158, y: 501, size: 7},
    addInfoOccAddr2Line2: { x: 158, y: 492, size: 7},
    addInfoOccAddr2Line3: { x: 158, y: 483, size: 7},
    addInfoOccTel2: { x: 277, y: 490, size: 9},
    addInfoOccField2: { x: 380, y: 490, size: 9},
    addInfoOccFromDate2: { x: 490, y: 490, size: 9},
    addInfoOccToDate2: { x: 538, y: 490, size: 9},
    addInfoOcc3: { x: 39, y: 461, size: 9},
    addInfoOccAddr3Line1: { x: 158, y: 472, size: 7},
    addInfoOccAddr3Line2: { x: 158, y: 463, size: 7},
    addInfoOccAddr3Line3: { x: 158, y: 454, size: 7},
    addInfoOccTel3: { x: 277, y: 461, size: 9},
    addInfoOccField3: { x: 380, y: 461, size: 9},
    addInfoOccFromDate3: { x: 490, y: 461, size: 9},
    addInfoOccToDate3: { x: 538, y: 461, size: 9},
    refSurname1: { x: 40, y: 379, size: 9},
    refGivenName1: { x: 252, y: 379, size: 9},
    refRelation1: { x: 462, y: 379, size: 9},
    refAddr1: { x: 41, y: 350, size: 9},
    refTelDay1: { x: 41, y: 320, size: DEFAULT_FONT_SIZE},
    refTelOther1: { x: 167, y: 320, size: DEFAULT_FONT_SIZE},
    refEmail1: { x: 291, y: 320, size: DEFAULT_FONT_SIZE},
    refKnown1: { x: 500, y: 323, size: DEFAULT_FONT_SIZE},
    refSurname2: { x: 40, y: 291, size: 9},
    refGivenName2: { x: 252, y: 291, size: 9},
    refRelation2: { x: 462, y: 291, size: 9},
    refAddr2: { x: 41, y: 262, size: 9},
    refTelDay2: { x: 41, y: 232, size: DEFAULT_FONT_SIZE},
    refTelOther2: { x: 167, y: 232, size: DEFAULT_FONT_SIZE},
    refEmail2: { x: 291, y: 232, size: DEFAULT_FONT_SIZE},
    refKnown2: { x: 500, y: 235, size: DEFAULT_FONT_SIZE},
    emergeSurname: { x: 42, y: 153, size: DEFAULT_FONT_SIZE},
    emergeGivenName: { x: 311, y: 153, size: DEFAULT_FONT_SIZE},
    emergeRelation: { x: 42, y: 120, size: DEFAULT_FONT_SIZE},
    emergeTelDay: { x: 167, y: 120, size: DEFAULT_FONT_SIZE},
    emergeTelOther: { x: 291, y: 120, size: DEFAULT_FONT_SIZE},
    emergeEmail: { x: 417, y: 120, size: DEFAULT_FONT_SIZE},
    emergeAddrNum: { x: 42, y: 92, size: DEFAULT_FONT_SIZE},
    emergeAddrStreet: { x: 78, y: 92, size: DEFAULT_FONT_SIZE},
    emergeAddrApt: { x: 245, y: 92, size: DEFAULT_FONT_SIZE},
    emergeAddrCity: { x: 285, y: 92, size: DEFAULT_FONT_SIZE},
    emergeAddrProvince: { x: 450, y: 92, size: DEFAULT_FONT_SIZE},
    emergeAddrPostal: { x: 520, y: 92, size: DEFAULT_FONT_SIZE},
  },
};