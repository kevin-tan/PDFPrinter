package com.pdfprinter;

import android.os.Build;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.pdfprinter.printer.PDFOutputService;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

@RequiresApi(api = Build.VERSION_CODES.KITKAT)
public class PDFPrinterModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final PDFOutputService pdfOutputService;

    PDFPrinterModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.pdfOutputService = new PDFOutputService(reactContext);
    }

    @Override
    public String getName() {
        return "PDFPrinterModule";
    }

    /**
     * Print Document React Method to use android print manager to print documents. Will parse the
     * data found in the pages provided.
     * There are two action types supported: Texts and BackgroundImage.
     * - Text: text to be drawn on the PDFDocument to be printed for the specific page.
     * - Can be a radio button
     * - Can be plain text
     * - BackgroundImage: image to be drawn on the PDFDocument as a background for the specific
     * page.
     *
     * @param pages        Array of Pages containing a ReadableMap of Text and Background to draw onto
     *                     PDFDocument.
     * @param documentName Name of the Document used for Print Job Name
     * @param callback     Callback to be invoked when print job is complete
     */
    @ReactMethod
    public void printDocument(ReadableArray pages, String documentName, Callback callback) {
        pdfOutputService.printDocument(pages, documentName, callback);
    }

    /**
     * TODO: TEST
     * React Method to handle rendering a viewable PDF form.
     *
     * @param pages              Array of Pages containing a ReadableMap of Text and Background to draw onto
     *                           PDFDocument. (see above)
     * @param documentName       PDF document name.
     * @param callback           Callback to be invoked when PDF generated or failed to generate.
     */
    @ReactMethod
    public void createPDFDocument(ReadableArray pages, String documentName, Callback callback) {
        pdfOutputService.createPDFDocument(pages, documentName, callback);
    }

}