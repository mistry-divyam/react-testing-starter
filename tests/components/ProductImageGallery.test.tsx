import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should render nothing when url list is empty", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render a list of images", () => {
    const urls: string[] = [
      "https://image1.jpg",
      "https://image2.jpg",
      "https://image3.jpg",
    ];
    render(<ProductImageGallery imageUrls={urls} />);

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(urls.length);
    urls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute("src", url);
    });
  });
});
