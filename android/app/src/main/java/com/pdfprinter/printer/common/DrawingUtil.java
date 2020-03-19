package com.pdfprinter.printer.common;

import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.pdf.PdfDocument;
import android.os.Build;
import android.util.Log;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.io.IOException;
import java.io.InputStream;

import androidx.annotation.RequiresApi;

/**
 * Drawing Utility class responsible for handling all canvas drawings for generating a PDF document.
 */
@RequiresApi(api = Build.VERSION_CODES.KITKAT)
public final class DrawingUtil {

    private final static String TAG = "DrawingUtil";

    // Constants for retrieving fields for actionsMap
    private final static String TEXT_ARRAY = "textArray";
    private final static String BACKGROUND_IMAGE_PATH = "backgroundImagePath";
    private final static String FONT_SIZE = "fontSize";
    private final static String RADIO_BUTTON = "radioButton";
    private final static String FONT_COLOR = "color";
    private final static String X_COORD = "x";
    private final static String Y_COORD = "y";
    private final static String VALUE = "value";

    private DrawingUtil() {
    }

    public static void drawPage(ReadableMap textImageMap, ReactContext context, PdfDocument.Page page) {
        Log.d(TAG, "Begin to draw onto PDF Page.");
        String backgroundImagePath = textImageMap.getString(BACKGROUND_IMAGE_PATH);
        ReadableArray textArray = textImageMap.getArray(TEXT_ARRAY);

        Canvas canvas = page.getCanvas();
        Paint paint = new Paint();

        // Set image as canvas bitmap to draw
        Bitmap fullSizeBitmap = getImageBitmap(context, backgroundImagePath);
        if (fullSizeBitmap == null) {
            Log.d(TAG, "No image found, doing nothing to PDF page.");
            return; // Do-nothing
        }
        Log.d(TAG, "Image being drawn onto PDF document.");
        Bitmap bitmap = Bitmap.createScaledBitmap(fullSizeBitmap, canvas.getWidth(), canvas.getHeight(), true);
        canvas.drawBitmap(bitmap, 0, 0, null);

        // Draw texts onto canvas
        for (int i = 0; i < textArray.size(); i++) {
            ReadableMap textMap = textArray.getMap(i);
            paint.setColor(Color.parseColor(textMap.getString(FONT_COLOR)));
            if (textMap.hasKey(RADIO_BUTTON)) {
                Log.d(TAG, "Drawing on radio buttons");
                canvas.drawCircle(textMap.getInt(X_COORD), textMap.getInt(Y_COORD), textMap.getInt(FONT_SIZE), paint);
            } else {
                String text = textMap.getString(VALUE);
                Log.d(TAG, String.format("Drawing on text: %s", text));
                paint.setTextSize(textMap.getInt(FONT_SIZE));
                canvas.drawText(text, textMap.getInt(X_COORD), textMap.getInt(Y_COORD), paint);
            }
        }
    }

    private static Bitmap getImageBitmap(ReactContext context, String imagePath) {
        Log.d(TAG, "Fetching image: " + imagePath);
        AssetManager assetManager = context.getAssets();
        InputStream istr = null;
        try {
            istr = assetManager.open(imagePath);
        } catch (IOException e) {
            Log.e(TAG, e.getMessage());
            return null;
        }
        return BitmapFactory.decodeStream(istr);
    }

}
