package com.pdfprinter.printer;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.pdf.PdfDocument;
import android.os.Build;
import android.print.PrintAttributes;
import android.print.PrintManager;
import android.print.pdf.PrintedPdfDocument;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.pdfprinter.printer.common.DrawingUtil;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;

import androidx.annotation.RequiresApi;

/**
 * Class holding the functionality to render a viewable PDF as well as rendering a PDF ready to be
 * printed utilizing the Android Print API.
 */
@RequiresApi(api = Build.VERSION_CODES.KITKAT)
public class PDFOutputService {
    private final static String TAG = "PDFOutputService";

    // We don't care about other attributes as its used to only generate the size of the PDF.
    @SuppressLint("NewApi")
    private static PrintAttributes PDF_STANDARD_ATTRIBUTE =
            new PrintAttributes.Builder().setMediaSize(PrintAttributes.MediaSize.NA_LETTER)
                    .setMinMargins(PrintAttributes.Margins.NO_MARGINS).build();

    private final ReactContext context;

    public PDFOutputService(final ReactContext context) {
        this.context = context;
    }

    public void printDocument(ReadableArray pages, String documentName, Callback callback) {
        PrintManager printManager = (PrintManager)
                context.getCurrentActivity().getSystemService(Context.PRINT_SERVICE);
        printManager.print(documentName, new PDFPrinterAdapter(pages, context, callback), null);
    }

    public void createPDFDocument(ReadableArray pages, String documentName, Callback callback) {
        PrintedPdfDocument pdfDocument = new PrintedPdfDocument(
                Objects.requireNonNull(context.getCurrentActivity()), PDF_STANDARD_ATTRIBUTE);
        for (int i = 0; i < pages.size(); i++) {
            PdfDocument.Page page = pdfDocument.startPage(i);
            DrawingUtil.drawPage(Objects.requireNonNull(pages.getMap(i)), context, page);
            pdfDocument.finishPage(page);
        }

        try {
            pdfDocument.writeTo(new FileOutputStream(documentName));
            pdfDocument.close();
            callback.invoke(true, documentName);
        } catch (IOException e) {
            pdfDocument.close();
            Log.e(TAG, e.toString());
            callback.invoke(false, "");
        }
    }

}
