package com.pdfprinter.printer;

import android.graphics.pdf.PdfDocument;
import android.os.Build;
import android.os.Bundle;
import android.os.CancellationSignal;
import android.os.ParcelFileDescriptor;
import android.print.PageRange;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintDocumentInfo;
import android.print.pdf.PrintedPdfDocument;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.pdfprinter.printer.common.DrawingUtil;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;

import androidx.annotation.RequiresApi;

/**
 * Implementation of the PrintDocumentAdapter to handle drawing for the PDF document.
 */
@RequiresApi(api = Build.VERSION_CODES.KITKAT)
public class PDFPrinterAdapter extends PrintDocumentAdapter {

    private final static String TAG = "PDFPrinterAdapter";
    private final static String PRINT_PDF_OUTPUT_NAME = "print_output.pdf";


    private final ReactContext context;
    private final Callback callback;
    private PrintedPdfDocument pdfDocument;
    private final ReadableArray pages;

    PDFPrinterAdapter(ReadableArray pages, ReactContext context, final Callback callback) {
        this.context = context;
        this.callback = callback;
        this.pages = pages;
    }

    @Override
    public void onLayout(PrintAttributes oldAttributes, PrintAttributes newAttributes,
                         CancellationSignal cancellationSignal, LayoutResultCallback callback,
                         Bundle extras) {
        // We do not currently support landscape PDF printing mode
        if (!newAttributes.getMediaSize().isPortrait()) {
            callback.onLayoutFailed("Landscape Printing mode not supported!");
        } else if (pages.size() <= 0) {
            callback.onLayoutFailed("0 Pages to Print!");
        }

        pdfDocument = new PrintedPdfDocument(Objects.requireNonNull(context.getCurrentActivity()), newAttributes);

        // Respond to cancellation request
        if (cancellationSignal.isCanceled()) {
            callback.onLayoutCancelled();
            return;
        }

        PrintDocumentInfo info = new PrintDocumentInfo.Builder(PRINT_PDF_OUTPUT_NAME)
                .setContentType(PrintDocumentInfo.CONTENT_TYPE_DOCUMENT)
                .setPageCount(pages.size())
                .build();

        callback.onLayoutFinished(info, true);
    }

    @Override
    public void onWrite(PageRange[] pages, ParcelFileDescriptor destination,
                        CancellationSignal cancellationSignal, WriteResultCallback callback) {
        for (int i = 0; i < this.pages.size(); i++) {
            PdfDocument.Page page = pdfDocument.startPage(i);
            if (cancellationSignal.isCanceled()) {
                callback.onWriteCancelled();
                pdfDocument.close();
                pdfDocument = null;
                return;
            }
            DrawingUtil.drawPage(Objects.requireNonNull(this.pages.getMap(i)), this.context, page);
            pdfDocument.finishPage(page);
        }

        try {
            pdfDocument.writeTo(new FileOutputStream(destination.getFileDescriptor()));
        } catch (IOException e) {
            callback.onWriteFailed(e.toString());
            return;
        } finally {
            pdfDocument.close();
            pdfDocument = null;
        }

        callback.onWriteFinished(pages);
    }

    @Override
    public void onFinish() {
        callback.invoke(true);
    }
}
